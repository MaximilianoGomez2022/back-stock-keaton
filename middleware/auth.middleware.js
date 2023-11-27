import jwt from 'jsonwebtoken'
import * as userService from '../services/users.services.js'
import * as tokenService from '../services/token.services.js'

function isLogin(req, res, next){
    const token = req.headers['auth-token']

    if(!token){
        res.status(401).json({message: 'No se envió un token'})
        return
    }

    try {       
        const payload = jwt.verify(token, 'clave-secreta')
        tokenService.findByToken(token)
            .then(tokenFound => {
                if (!tokenFound) {
                    return res.status(401).json({ message: 'Token invalido' })
                }
                userService.findById(payload.id)
                    .then(user => {
                        req.user = user
                        next()
                    })
                })
    } catch (err) {
        res.status(401).json({message: 'Token inválido'})
        return
    }
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(401).json({ message: 'No tienes permiso para realizar esta accion' })
    }
    next()
}

export {
    isLogin,
    isAdmin
}