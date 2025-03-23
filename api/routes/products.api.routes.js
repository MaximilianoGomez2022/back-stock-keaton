import express from "express"
import *as ProductsApiController from '../controllers/products.api.controllers.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const route = express.Router()

route.route('/api/products')
.get( ProductsApiController.findall)
.post(ProductsApiController.crearPelicula)

route.route('/api/products/:id')
.get(ProductsApiController.findById)
.patch(ProductsApiController.editById)
.put(ProductsApiController.replaceById)
.delete(ProductsApiController.deleteById)

route.route('/api/historial')
.post(ProductsApiController.guardarHistorial)

export default route
