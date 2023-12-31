import { MongoClient, ObjectId} from "mongodb"
const client = new MongoClient('mongodb+srv://portfolio2023:Riverplate_SAG_1991@cluster0.ghun0gd.mongodb.net/?retryWrites=true&w=majority')

async function guardarSesion(product){
    const nuevoProducto = {
        ...product
    }
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Sesion').insertOne(nuevoProducto)
    })
    .then(function(){
        return nuevoProducto
    })
}

async function traerSesiones(){

    return client.connect()
    .then(async function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Sesion').find().toArray()
    })
}

async function traerPorId(id){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Sesion').findOne({ _id: new ObjectId(id) })
    })
}

async function editarSesion(id, sesion){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Sesion').updateOne({_id: new ObjectId(id)}, {$set:sesion})
    })
}

export {
    guardarSesion,
    editarSesion,
    traerPorId,
    traerSesiones
}