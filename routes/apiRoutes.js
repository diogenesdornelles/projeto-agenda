const express = require('express');
const route = express.Router();

const apiController = require('../src/controllers/apiController');

route.get('/api/advice/register/:userName', apiController.get_advice_register);

route.get('/api/advice/login/:userName', apiController.get_advice_login);

route.get('/api/advice/contact/:cpf', apiController.get_advice_contact);

route.get('/api/advice/event/:_idContact', apiController.get_advice_event);

route.get('/api/advice/attevent/:_idContact', apiController.get_advice_attevent);

module.exports = route;