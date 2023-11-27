import express from 'express';
import *as GenerosApiController from '../controllers/generos.api.controllers.js'

const route = express.Router()

route.route('/api/categories')
.get(GenerosApiController.findall)
.post(GenerosApiController.crearGenero)

route.route('/api/generos/:id')
.get(GenerosApiController.findById)
.patch(GenerosApiController.editById)
.put(GenerosApiController.replaceById)
.delete(GenerosApiController.deleteById)

export default route