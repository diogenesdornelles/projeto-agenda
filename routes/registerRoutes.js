const express = require('express');
const route = express.Router();

const registerController = require('../src/controllers/registerController');

route.get('/registrar/:load?', registerController.get_register_page);

route.post('/registrar', registerController.post_register_user);

module.exports = route;