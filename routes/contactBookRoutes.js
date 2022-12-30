const express = require('express');
const route = express.Router();

const contactBookController = require('../src/controllers/contactBookController');

route.delete('/delete/contato/:_idContact', contactBookController.delete_contact);

route.get('/agenda/contatos', contactBookController.get_all_contacts);

route.get('/agenda/searchContact/CPF/:cpfNumber?', contactBookController.get_contact_by_cpf);

route.get('/agenda/searchContact/name/:name?', contactBookController.get_contact_by_name);

route.get('/agenda/:load?/:_idUser?', contactBookController.loginIsRequired, contactBookController.get_contactBook_page);

route.post('/agenda', contactBookController.create_contact);

route.post('/salvar/evento/:_idContact', contactBookController.create_event);

route.put('/atualizar/evento/:_idContact', contactBookController.update_event);

route.delete('/delete/event/:_idContact', contactBookController.delete_event);

route.put('/update/contato/:_idContact', contactBookController.update_contact);

route.get('/eventos/agenda',contactBookController.get_agenda);

route.get('/mostrar/evento/:_idContact/:value?', contactBookController.get_agenda_contact);

module.exports = route;