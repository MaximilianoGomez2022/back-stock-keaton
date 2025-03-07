import *as PedidosServices from '../../services/pedidos.services.js'

function crearPedido(req, res){
    const Pedido = {
        nombre : req.body.fecha,
        productos: req.body.fecha
    }

    PedidosServices.guardarPedido(Pedido)
    .then(function(nuevaPedido){
        res.status(201).json(nuevaPedido)
    })
}

export {
    crearPedido
}
