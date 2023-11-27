import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient('mongodb://127.0.0.1:27017')

async function trearGeneros(){
    return client.connect()
    .then(function(){
        const db =  client.db('CRUD')
        return db.collection('Categories').find().toArray()
    })
}

async function guardarGeneros(genero){
    const nuevoGenero = {
        ...genero
    }
    return client.connect()
    .then(function(){
        const db = client.db('CRUD')
        return db.collection('Categories').insertOne(nuevoGenero)
    })
    .then(function(){
        return nuevoGenero
    })
}

async function editarGenero(id, genero){
    return client.connect()
    .then(function(){
        const db = client.db('CRUD')
        return db.collection('Categories').updateOne({_id: new ObjectId(id)}, {$set:genero})
    })
}

async function reemplazarGenero(id, genero){
    return client.connect()
    .then(function(){
        const db = client.db('CRUD')
        return db.collection('Categories').replaceOne({_id: new ObjectId(id)}, genero)
    })
}

async function eliminarGenero(id){
    return client.connect()
    .then(function(){
        const db = client.db('CRUD')
        return db.collection('Categories').deleteOne({_id: new ObjectId(id)})
    })
}

async function traerPorId(id){
    return client.connect()
    .then(function(){
        const db = client.db('CRUD')
        return db.collection('Categories').findOne({ _id: new ObjectId(id) })
    })
}

export {
    trearGeneros,
    guardarGeneros,
    editarGenero,
    reemplazarGenero,
    eliminarGenero,
    traerPorId
}