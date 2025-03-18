import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'

const client = new MongoClient('mongodb+srv://portfolio2023:Riverplate_SAG_1991@cluster0.ghun0gd.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('STOCK-KEATON')
const users = db.collection('Users')

async function login(userLogin){
    await client.connect()

    const user = await users.findOne({mail: userLogin.mail})

    if(!user){
        throw new Error('usuario incorrecto')
    }

    const isMatch = await bcrypt.compare(userLogin.password, user.password)

    if(!isMatch){
        throw new Error('Contraseña incorrecta')
    }

    return user
}

async function find(filter){
    await client.connect()

    const userColecction = await users.find(filter).toArray()
    return userColecction

}

async function findById(id) {
    await client.connect()

    const user = await users.findOne({ _id: ObjectId(id) })

    return user
}

async function create(user){

    const newUser = {...user}

    const userExist = await users.findOne({mail: newUser.mail})

    if(userExist) {
        throw new Error('el usuario ya existe')
    }

    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(newUser.password, salt)

    newUser.password = passwordHash

    return client.connect()
    .then(async function(){
        return users.insertOne(newUser)
    })
}

async function editUser(id, user){

    

    // Verificar la contraseña actual
    // const isMatch = await bcrypt.compare(currentPassword, user.password);
    // if (!isMatch) {
    //     return res.status(401).json({ message: "La contraseña actual es incorrecta" });
    // }

    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set:user})
    })
}

async function remove(id){
    await client.connect()

    await users.deleteOne({_id: new ObjectId(id)})
}

async function cambiarContraseña(id, nuevaPassword) {
    try {
        await client.connect();

        // Generar un nuevo hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(nuevaPassword, salt);

        // Actualizar la contraseña en la base de datos
        const result = await users.updateOne(
            { _id: new ObjectId(id) },
            { $set: { password: passwordHash } }
        );

        return result;
    } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        throw new Error("Error en la base de datos");
    }
}


export {
    find,
    findById,
    create,
    editUser,
    remove,
    login,
    cambiarContraseña
}