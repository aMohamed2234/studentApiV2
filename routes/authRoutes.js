const express = require('express')
const routes = express.Router()
const authController = require('../controllers/authController')

routes.post('/register', authController.register)

routes.get('/getAllUser', authController.getAllUser)

routes.get('/getUserById/:user_id', authController.getUserById)

routes.patch('/updateUser/:user_id', authController.updateUser)

routes.delete('/deleteUser/:user_id', authController.deleteUser)

routes.post('/login', authController.login)

module.exports = routes