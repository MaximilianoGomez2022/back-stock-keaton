import express from "express"
import *as ProductsApiController from '../controllers/products.api.controllers.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const route = express.Router()

route.route('/api/products')
.get([isLogin], ProductsApiController.findall)
.post([isLogin, isAdmin],ProductsApiController.crearPelicula)

route.route('/api/products/:id')
.get([isLogin],ProductsApiController.findById)
.patch([isLogin, isAdmin],ProductsApiController.editById)
.put([isLogin, isAdmin],ProductsApiController.replaceById)
.delete([isLogin, isAdmin],ProductsApiController.deleteById)

route.route('/api/historial')
.post([isLogin, isAdmin],ProductsApiController.guardarHistorial)

export default route
