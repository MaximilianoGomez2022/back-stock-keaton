import *as PedidosServices from '../../services/pedidos.services.js'

function crearPedido(req, res){
    const Pedido = {
        fecha : req.body.fecha,
        productos: req.body.productos
    }

    PedidosServices.guardarPedido(Pedido)
    .then(function(nuevaPedido){
        res.status(201).json(nuevaPedido)
    })
}

function traer(req, res){
    PedidosServices.traerPedidos()
    .then(function(pedidos){
        res.status(200).json(pedidos)
    })
}

function traerPorId (req, res) {
    const id = req.params.id

    PedidosServices.traerPorId(id)
    .then(function(pedido){
        if (pedido) {
            res.status(200).json(pedido)
        }   else {
            res.status(404).json({messagge : "Pedido no encontrado"})
        }       
    })
}

export {
    crearPedido,
    traer,
    traerPorId
}
