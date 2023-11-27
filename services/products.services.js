import { MongoClient, ObjectId} from "mongodb"
const client = new MongoClient('mongodb://127.0.0.1:27017')

async function traerDestacadas(){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').find({destacada:true}).toArray()
    })
    .catch(function(err){

    })
}

async function traerTrabajos(filter){

    const filterQuery =  {
        ...filter
    }

    if(filterQuery.genero) {
        filterQuery.genero = {$regex : filterQuery.genero, $options: 'i'}
    } 

    return client.connect()
    .then(async function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').find(filterQuery).toArray()
    })
}

async function traerPorId(id){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').findOne({ _id: new ObjectId(id) })
    })
}

async function guardarProduct(product){
    const nuevoProducto = {
        ...product
    }
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').insertOne(nuevoProducto)
    })
    .then(function(){
        return nuevoProducto
    })
}

async function guardarHistorial(product){
    const nuevoProducto = {
        ...product,
        fecha: new Date()
    }
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('hitorial').insertOne(nuevoProducto)
    })
    .then(function(){
        return nuevoProducto
    })
}

async function editarPelicula(id, producto){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').updateOne({_id: new ObjectId(id)}, {$set:producto})
    })
}

async function reemplazarPelicula(id, pelicula){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').replaceOne({_id: new ObjectId(id)},pelicula)
    })
}

async function eliminarProducto(id){
    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Productos').deleteOne({_id: new ObjectId(id)})
    })
}

export{
    traerTrabajos,
    traerDestacadas,
    traerPorId,
    guardarProduct,
    editarPelicula,
    reemplazarPelicula,
    eliminarProducto,
    guardarHistorial
}