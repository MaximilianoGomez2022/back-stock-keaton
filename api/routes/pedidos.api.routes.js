import express from "express"
import *as PedidosApiController from '../controllers/pedidos.api.controller.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const route = express.Router()

route.route('/api/pedidos')
.get([isLogin, isAdmin], PedidosApiController.traer)
.post([isLogin, isAdmin], PedidosApiController.crearPedido)

route.route('/api/pedido/:id')
.get([isLogin, isAdmin], PedidosApiController.traerPorId )
.patch([isLogin, isAdmin], PedidosApiController.editarPedido)
.delete([isLogin, isAdmin], PedidosApiController.eliminarPedido)

export default route