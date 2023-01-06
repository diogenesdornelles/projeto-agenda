const express = require('express')
const route = express.Router()

const loginController = require('../src/controllers/loginController')

route.get('/entrar/:load?', loginController.get_login_page)

route.post('/entrar', loginController.post_login)

module.exports = route
