import { MongoClient, ObjectId} from "mongodb"
const client = new MongoClient('mongodb+srv://portfolio2023:Riverplate_SAG_1991@cluster0.ghun0gd.mongodb.net/?retryWrites=true&w=majority')

async function guardarPedido(pedido){
    const nuevoPedido = {
        ...pedido
    }

    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        return db.collection('Pedidos').insertOne(nuevoPedido)
    })
    .then(function(){
        return nuevoPedido
    })
}

async function traerPedidos(){

    return client.connect()
    .then(function(){
        const db = client.db('STOCK-KEATON')
        const pedidos = db.collection('Pedidos').find().toArray();
        return pedidos;
    })
}

export {
    guardarPedido,
    traerPedidos
}