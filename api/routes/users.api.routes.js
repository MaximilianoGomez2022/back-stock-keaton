import express from 'express'
import *as userController from '../../api/controllers/users.api.controllers.js'
import { isLoginValid } from '../../middleware/userValid.middleware.js'
import { isLogin, isAdmin } from "../../middleware/auth.middleware.js"

const router = express.Router()

router.route('/api/users/login')
.post([isLoginValid],userController.login)

router.route('/api/users/logout')
.post(userController.logout)

router.route('/api/users')
.get([isLogin, isAdmin], userController.find)
.post([isLogin, isAdmin], userController.create)

router.route('/api/users/:id')
.get([isLogin, isAdmin], userController.findById)
.patch([isLogin, isAdmin], userController.editUser)
.delete([isLogin, isAdmin], userController.remove)

router.route('/api/users/cambiarPassword/:id')
.patch([isLogin, isAdmin], userController.cambiarContraseña)

export default router

