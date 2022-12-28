const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');
// renderize HTML
exports.get_register_page = (req, res) => {
  if (req.params.load === 'registerPage') {
  res.render('register', {
    title: 'Registro',
  });
  } else {
    res.render('index', {
      title: ''
    });
  }
}

exports.post_register_user = async (req, res) => {  
 
  if (req.body.password !== req.body.repPassword){
    req.session[req.body.userName] = {password: 'Senhas não conferem!'};
    try {
      await req.session.save();
      res.status(204).send();
      return;
    } catch (e) {
      console.log(e);
      res.status(204).send();
    }
  } 

  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync(req.body.password, salt);

  User.create({
    name: req.body.name,
    surname: req.body.surname,
    birthday: new Date(req.body.birthday),
    email: req.body.email,
    gender: req.body.gender,
    cpf: req.body.cpf,
    userName: req.body.userName,
    password: password,
  })
  .then(async () => {
    req.session[req.body.userName] = {user: 'Usuário criado no cadastro! Faça o login!'};
    try {
      await req.session.save();
      res.status(204).send();
      return;
    } catch (e) {
      console.log(e);
      res.status(204).send();
    }
  })
  .catch(async err => {
    if (err.code === 11000) {
      if ('cpf' in err.keyPattern){
        req.session[req.body.userName] = {cpf: 'CPF já consta no cadastro!'};
        try {
          await req.session.save();
          res.status(204).send();
          return;
        } catch (e) {
          console.log(e);
          res.status(204).send();
        }
      } 
      if ('userName' in err.keyPattern){
        req.session[req.body.userName] = {user: 'Usuário já consta no cadastro!'};
        try {
          await req.session.save();
          res.status(204).send();
          return;
        } catch (e) {
          console.log(e);
          res.status(204).send();
        }
      } 
    } 
    if (err.name === 'ValidationError'){
      if ('cpf' in err.errors) {
        res.status(204).send();
        return;
      } 
    } 
    console.log(err)
  });
}
