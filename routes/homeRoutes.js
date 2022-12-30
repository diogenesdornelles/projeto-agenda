const express = require('express');
const route = express.Router();

const homeController = require('../src/controllers/homeController');

route.get('/home/:load?', homeController.get_home_page);

module.exports = route;