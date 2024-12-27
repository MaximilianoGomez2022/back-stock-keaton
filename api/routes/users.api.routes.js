import express from 'express'
import *as userController from '../../api/controllers/users.api.controllers.js'
import { isLoginValid } from '../../middleware/userValid.middleware.js'

const router = express.Router()

router.route('/api/users/login')
.post([isLoginValid],userController.login)

router.route('/api/users/logout')
.post(userController.logout)

router.route('/api/users')
.get(userController.find)
.post(userController.create)

router.route('/api/users/:id')
.get(userController.findById)
.patch(userController.editUser)
.delete(userController.remove)

export default router

