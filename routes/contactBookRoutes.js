const express = require('express')
const route = express.Router()

const contactBookController = require('../src/controllers/contactBookController')
const middlewares = require('../src/middlewares/middleware')

route.delete('/delete/contato/:id', contactBookController.delete_contact)

route.get('/agenda/contatos', contactBookController.get_all_contacts)

route.get('/agenda/searchContact/CPF/:cpf?', contactBookController.get_contact_by_cpf)

route.get('/agenda/searchContact/name/:name?', contactBookController.get_contact_by_name)

route.get('/agenda/:load?/:id?', middlewares.loginIsRequired, contactBookController.get_contactBook_page)

route.post('/agenda', contactBookController.create_contact)

route.post('/salvar/evento/:id', contactBookController.create_event)

route.put('/atualizar/evento/:id', contactBookController.update_event)

route.delete('/delete/event/:id', contactBookController.delete_event)

route.put('/update/contato/:id', contactBookController.update_contact)

route.get('/eventos/agenda', contactBookController.get_agenda)

route.get('/mostrar/evento/:id/:value?', contactBookController.get_agenda_contact)

module.exports = route
