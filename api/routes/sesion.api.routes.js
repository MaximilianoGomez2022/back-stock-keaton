import express from "express"
import *as SesionApiController from '../controllers/sesion.api.controllers.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const route = express.Router()

route.route('/api/sesion')
.get(SesionApiController.findall)
.post(SesionApiController.crearSesion)

route.route('/api/sesion/:id')
.patch(SesionApiController.editById)

export default route