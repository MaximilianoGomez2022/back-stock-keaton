import jwt from 'jsonwebtoken'
import *as usersService from '../../services/users.services.js'
import * as tokenService from '../../services/token.services.js'
import bcrypt from 'bcrypt'

function login(req, res){

    usersService.login(req.body)
    .then(user => {
        
        const token = jwt.sign({id: user._id, mail: user.mail}, 'clave-secreta')
        tokenService.create({ token, user_id: user._id })
        res.json({token, user})
        
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
}

function logout(req, res) {
    const token = req.headers['auth-token']

    tokenService.deleteByToken(token)

    res.json({ message: 'Logout exitoso' })

}

function find(req, res){
    const filter = {}

    const token = req.headers['auth-token']

    if(!token){
        res.status(401).json({message: 'No se envió un token'})
        return
    }

    try {
        const payload = jwt.verify(token, 'clave-secreta')
    } catch (err) {
        res.status(401).json({message: 'Token inválido'})
        return
    }


            usersService.find(filter)
            .then(users => {
                res.json(users)
            })
}

function findById(req, res){

    const id = req.params.id

    usersService.findById(id)
    .then(function(user){
        if (user) {
            res.status(200).json(user)
        }   else {
            res.status(404).json({messagge : "Ususario no encontrado"})
        }       
    })
}

function create(req, res){

    const user = {
        mail : req.body.mail,
        password : req.body.password,
        role :  "user"
    }

    usersService.create(user)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })

}

function editUser(req, res){
    const id = req.params.id

    const user = {}

    if(req.body.mail) {
        user.mail = req.body.mail
    }

    if(req.body.password) {
        user.password = req.body.password
    }
    
    usersService.editUser(id, user)
    .then(function(user){
        if (user) {
            res.status(200).json({messagge : "User editado con éxito."})
        }   else {
            res.status(404).json({messagge : "User no encontrado"})
        } 
    })
}

function remove(req, res) {

    const id = req.params.id

    usersService.remove(id)
        .then(user => {
            res.json({message:'usuario eliminado'})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
}

async function cambiarContraseña(req, res) {
    try {
        const { actualPassword, nuevaPassword } = req.body;
        const id = req.params.id;

        // Buscar el usuario en la base de datos
        const user = await usersService.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que la contraseña actual sea correcta
        const isMatch = await bcrypt.compare(actualPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "La contraseña actual es incorrecta" });
        }

        // Llamar al servicio para actualizar la contraseña
        const result = await usersService.cambiarContraseña(id, nuevaPassword);

        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: "Contraseña actualizada con éxito" });
        } else {
            return res.status(400).json({ message: "No se pudo actualizar la contraseña" });
        }
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export {
    find,
    findById,
    editUser,
    create,
    remove,
    login,
    logout,
    cambiarContraseña
}