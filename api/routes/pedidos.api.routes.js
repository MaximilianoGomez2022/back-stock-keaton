import express from "express"
import *as PedidosApiController from '../controllers/pedidos.api.controller.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const route = express.Router()

route.route('/api/pedidos')
.get( PedidosApiController.traer)
.post( PedidosApiController.crearPedido)

route.route('/api/pedido/:id')
.get( PedidosApiController.traerPorId )
.patch( PedidosApiController.editarPedido)
.delete (PedidosApiController.eliminarPedido)

export default route