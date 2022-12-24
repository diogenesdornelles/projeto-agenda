const { User } = require('../models/UserModel');
const { Contact } = require('../models/ContactModel');
const { Event } = require('../models/EventModel');
const { ValidateCpf } = require('../models/validateCpf');
const validator = require('validator');

exports.loginIsRequired = (req, res, next) => {
  if (req.params.load === 'contactBookPage' && (typeof req.params._idUser !== undefined)) {
    User.findOne({ 
      _id: req.params._idUser
    })
    .then(data => {
      if (data) {
        next();
      } else {
        res.render('contactBook', {
                logged: false, 
                contacts: false, 
              }
            )}
    }).catch( err => console.log(err));
  } else {
    res.render('contactBook', {
            logged: false, 
            contacts: false, 
          }
    )} 
};

// RENDERIZE FULL PAGE
exports.get_contactBook_page = (req, res) => {
        Contact.find().sort({ name: 1 })
        .then( data => {
          res.render('contactBook', {
                          logged: true, 
                          contacts: data, 
                        }
    )}).catch( err => {
      console.log(err);
      res.render('404');
    });
} 

// CREATE CONTACT
exports.create_contact = (req, res ) => {

  const validatorCpf = new ValidateCpf(req.body.cpf);
  if (!validatorCpf.validate()) {
    res.status(204).send();
    return;
  };

  const checkData = req.body.name && req.body.surname && req.body.email && req.body.phone && req.body.birthday && req.body.gender;
  
  if (!checkData || req.body.phone.length !== 11) {
    res.status(204).send();
    return;
  }

  if (req.body.phone.length !== 11) {
    res.status(204).send();
    return;
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(204).send();
    return;
  }

  Contact.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone,
    birthday: new Date(req.body.birthday),
    gender: req.body.gender,
    cpf: req.body.cpf,
  })
  .then(() => {
    req.session[req.body.cpf] = {contact: 'Contato salvo no cadastro!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    console.log(err);
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        res.status(204).send();
        return;
      } 
    } 
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session[req.body.cpf] = {cpf: 'CPF já consta no cadastro!'};
        req.session.save();
        res.status(204).send();
        return;
      } 
    } 
  });
}

// READ CONTACT
exports.get_all_contacts = (req, res) => {
  Contact.find().sort({ name: 1 })
  .then( data => {
    if (data) {
      res.render('tableContacts', {
        contacts: data, 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
        })
    }
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

// READ CONTACT
exports.get_contact_by_cpf = (req, res) => {
  Contact.findOne({ 
    cpf: req.params.cpfNumber,
  })
  .then(data => {
    if (data) {
      res.render('tableContacts', {
        contacts: [data], 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
      }
    )}
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

// READ CONTACT
exports.get_contact_by_name = (req, res) => {
  Contact.findOne({ 
    name: req.params.name,
  })
  .then(data => {
    let result;
    if (data) {
      if (typeof data === 'object') {
        result = [data]
      } else {
        result = data;
      }
      res.render('tableContacts', {
        contacts: result, 
        })
    } else {
      res.render('tableContacts', {
        contacts: false, 
      }
    )}
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

// UPDATE CONTACT
exports.update_contact = (req, res) => {
  
  const validatorCpf = new ValidateCpf(req.body.cpf);
  if (!validatorCpf.validate()) {
    res.status(204).send();
    return;
  };

  const checkData = req.body.name && req.body.surname && req.body.email && req.body.phone && req.body.birthday && req.body.gender;

  if (!checkData) {
    res.status(204).send();
    return;
  }

  if (req.body.phone.length !== 11) {
    res.status(204).send();
    return;
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(204).send();
    return;
  }

  Contact.findOneAndUpdate(
    {
      _id: req.params._idContact
    },
    { 
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      birthday: new Date(req.body.birthday),
      gender: req.body.gender,
      cpf: req.body.cpf,
    },
    { 
      new: true,
    },
  )
  .then( () => {
    req.session[req.body.cpf] = {contact: 'Contato atualizado no cadastro!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        res.status(204).send();
        return;
      } 
    }
    else {
      console.log(err);
      res.render('404');
    }
    console.log(err);
  });
}

// DELETE CONTACT
exports.delete_contact = (req, res) => {
  Contact.findByIdAndDelete(req.params._idContact)
  .then( () => {
    res.status(204).send();
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
};

// CREATE EVENT
exports.create_event = (req, res) => {
  
  Event.create({
    name: req.body.name,
    surname: req.body.surname,
    id: req.params._idContact,
    type: req.body.type,
    start: req.body.start,
    end: req.body.end,
    title: req.body.title,
    allDay: false,
    extendedProps: {
      tipo: req.body.type,
      nome: req.body.name,
      sobrenome: req.body.surname,
      id: req.params._idContact,
    },
    url: `/mostrar/evento/${req.params._idContact}`,
    className: 'contact-event-class',
  })
  .then(() => {
    req.session[req.params._idContact] = {event: 'Evento agendado!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
    console.log(err);
  });
}

// READ EVENT
exports.get_agenda = (req, res) => {
  Event.find().sort({ start: 1 })
  .then( (data) => {
    res.status(200).json(data); 
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
}

// READ EVENT
exports.get_agenda_contact = (req, res) => {
  if (req.params.value === 'true'){
    Event.findOne({
      id: req.params._idContact
    })
    .then( response => {
      res.render('event', {infos: response}); 
      }).catch( err => {
        console.log(err);
        res.render('404');
      });
  } else {
    res.status(204).send();
  }
}

// UPDATE EVENT
exports.update_event = (req, res) => {
  Event.findOneAndUpdate(
    {
      id: req.params._idContact
    },
    { $set: {
        type: req.body.type,
        start: req.body.start,
        end: req.body.end,
        title: req.body.title,
      }
    },
    { 
      runValidators: true, 
      new: true,
    },
  )
  .then( () => {
    req.session[req.body._idContact] = {event: 'Evento atualizado!'};
    req.session.save();
    res.status(204).send();
    return;
  })
  .catch(err => {
      console.log(err);
    }
  );
}

// DELETE EVENT
exports.delete_event = (req, res) => {
  Event.findOneAndDelete({
    id: req.params._idContact
  })
  .then( () => {
    res.status(204).send();
    }).catch( err => {
      console.log(err);
      res.render('404');
    });
};
