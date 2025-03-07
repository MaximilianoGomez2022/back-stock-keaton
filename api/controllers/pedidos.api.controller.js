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

export {
    crearPedido
}
