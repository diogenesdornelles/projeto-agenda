const { Contact } = require('../models/ContactModel')
const { Event } = require('../models/EventModel')
const { ValidateCpf } = require('../models/ValidateCpf')
const validator = require('validator')

// RENDERIZE FULL PAGE
exports.get_contactBook_page = (req, res) => {
  Contact.find().sort({ name: 1 })
    .then(data => {
      res.render('contactBook', {
        logged: true,
        contacts: data
      }
      )
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// CREATE CONTACT
exports.create_contact = (req, res) => {
  const { cpf, name, surname, email, phone, birthday, gender } = req.body

  const validatorCpf = new ValidateCpf(cpf)
  if (!validatorCpf.validate()) {
    return res.status(204).send()
  };

  const checkData = name && surname && email && phone && birthday && gender

  if (!checkData) {
    return res.status(204).send()
  }

  if (phone.length !== 11) {
    return res.status(204).send()
  }

  if (!validator.isEmail(email)) {
    return res.status(204).send()
  }

  Contact.create({
    name,
    surname,
    email,
    phone,
    birthday: new Date(birthday),
    gender,
    cpf
  })
    .then(async () => {
      req.session[cpf] = { contact: 'Contato salvo no cadastro!' }
      try {
        await req.session.save()
        return res.status(204).send()
      } catch (e) {
        console.log(e)
        return res.status(400).render('404')
      }
    })
    .catch(async err => {
      console.log(err)
      if (err.name === 'ValidationError') {
        if ('cpf' in err.errors) {
          return res.status(204).send()
        }
      }
      if (err.code === 11000) {
        if ('cpf' in err.keyPattern) {
          req.session[cpf] = { cpf: 'CPF já consta no cadastro!' }
          try {
            await req.session.save()
            return res.status(204).send()
          } catch (e) {
            console.log(e)
            return res.status(400).render('404')
          }
        }
      }
    })
}

// READ CONTACT
exports.get_all_contacts = (req, res) => {
  Contact.find().sort({ name: 1 })
    .then(data => {
      if (data.length > 0) {
        res.render('tableContacts', {
          contacts: data
        })
      } else {
        res.render('tableContacts', {
          contacts: false
        })
      }
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// READ CONTACT
exports.get_contact_by_cpf = (req, res) => {
  const { cpf } = req.params
  Contact.findOne({
    cpf
  })
    .then(data => {
      if (data) {
        res.render('tableContacts', {
          contacts: [data]
        })
      } else {
        res.render('tableContacts', {
          contacts: false
        }
        )
      }
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// READ CONTACT
exports.get_contact_by_name = (req, res) => {
  const { name } = req.params
  Contact.findOne({
    name
  })
    .then(data => {
      let result
      if (data) {
        if (typeof data === 'object') {
          result = [data]
        } else {
          result = data
        }
        res.render('tableContacts', {
          contacts: result
        })
      } else {
        res.render('tableContacts', {
          contacts: false
        }
        )
      }
    }).catch(err => {
      console.log(err)
      res.status(400).render('404')
    })
}

// UPDATE CONTACT
exports.update_contact = async (req, res) => {
  const { cpf, name, surname, email, phone, birthday, gender } = req.body
  const { id } = req.params
  const validatorCpf = new ValidateCpf(cpf)
  if (!validatorCpf.validate()) {
    return res.status(204).send()
  };

  const checkData = name && surname && email && phone && birthday && gender

  if (!checkData) {
    return res.status(204).send()
  }

  if (phone.length !== 11) {
    return res.status(204).send()
  }

  if (!validator.isEmail(email)) {
    return res.status(204).send()
  }
  let data
  try {
    const contact = await Contact.findById(id)
    if (contact.cpf !== cpf) {
      data = {
        name,
        surname,
        email,
        phone,
        birthday: new Date(birthday),
        gender,
        cpf
      }
    } else {
      data = {
        name,
        surname,
        email,
        phone,
        birthday: new Date(birthday),
        gender
      }
    }
    Contact.findOneAndUpdate(
      {
        _id: id
      },
      data,
      {
        new: true
      })
      .then(async () => {
        req.session[cpf] = { contact: 'Contato atualizado no cadastro!' }
        try {
          await req.session.save()
          return res.status(204).send()
        } catch (e) {
          console.log(e)
          return res.status(400).render('404')
        }
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          if ('cpf' in err.errors) {
            return res.status(204).send()
          }
        } else {
          console.log(err)
          return res.status(400).render('404')
        }
        console.log(err)
      })
  } catch (e) {
    console.log(e)
  }
}

// DELETE CONTACT
exports.delete_contact = (req, res) => {
  const { id } = req.params
  Contact.findByIdAndDelete(id)
    .then(() => {
      return res.status(204).send()
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// CREATE EVENT
exports.create_event = (req, res) => {
  const { name, surname, type, start, end, title } = req.body
  const { id } = req.params
  Event.create({
    name,
    surname,
    id,
    type,
    start,
    end,
    title,
    allDay: false,
    extendedProps: {
      tipo: type,
      nome: name,
      sobrenome: surname,
      id
    },
    url: `/mostrar/evento/${id}`,
    className: 'contact-event-class'
  })
    .then(async () => {
      req.session[id] = { event: 'Evento agendado!' }
      try {
        await req.session.save()
        return res.status(204).send()
      } catch (e) {
        console.log(e)
        return res.status(400).render('404')
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// READ EVENT
exports.get_agenda = (req, res) => {
  Event.find().sort({ start: 1 })
    .then((data) => {
      res.status(200).json(data)
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}

// READ EVENT
exports.get_agenda_contact = (req, res) => {
  const { value, id } = req.params
  if (value === 'true') {
    Event.findOne({
      id
    })
      .then(response => {
        res.render('event', { infos: response })
      }).catch(err => {
        console.log(err)
        return res.status(400).render('404')
      })
  } else {
    res.status(204).send()
  }
}

// UPDATE EVENT
exports.update_event = (req, res) => {
  const { type, start, end, title } = req.body
  const { id } = req.params
  Event.findOneAndUpdate(
    {
      id
    },
    {
      $set: {
        type,
        start,
        end,
        title
      }
    },
    {
      runValidators: true,
      new: true
    }
  )
    .then(async () => {
      req.session[id] = { event: 'Evento atualizado!' }
      try {
        await req.session.save()
        return res.status(204).send()
      } catch (e) {
        console.log(e)
        return res.status(400).render('404')
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(400).render('404')
    }
    )
}

// DELETE EVENT
exports.delete_event = (req, res) => {
  const { id } = req.params
  Event.findOneAndDelete({
    id
  })
    .then(() => {
      return res.status(204).send()
    }).catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}
