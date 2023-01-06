const { ValidateCpf } = require('../models/ValidateCpf')
const { User } = require('../models/UserModel')
const bcrypt = require('bcrypt')
const validator = require('validator')

// renderize HTML
exports.get_register_page = (req, res) => {
  const { load } = req.params
  if (load === 'registerPage') {
    res.render('register', {
      title: 'Registro'
    })
  } else {
    res.render('index', {
      title: ''
    })
  }
}

exports.post_register_user = async (req, res) => {
  const { cpf, name, surname, email, birthday, user, password, reppassword, gender } = req.body
  if (password !== reppassword) {
    req.session[user] = { password: 'Senhas não conferem!' }
    try {
      await req.session.save()
      return res.status(204).send()
    } catch (e) {
      console.log(e)
      return res.status(400).render('404')
    }
  }

  const validatorCpf = new ValidateCpf(cpf)
  if (!validatorCpf.validate()) {
    return res.status(204).send()
  };

  if (!name) {
    return res.status(204).send()
  }

  if (!surname) {
    return res.status(204).send()
  }

  if (!birthday) {
    return res.status(204).send()
  }

  if (!validator.isEmail(email)) {
    return res.status(204).send()
  }

  if (user.lenght < 3) {
    return res.status(204).send()
  }

  if (!/^[ A-Za-z0-9]+$/.test(user)) {
    return res.status(204).send()
  }

  const salt = bcrypt.genSaltSync()
  const _password = bcrypt.hashSync(password, salt)

  User.create({
    name,
    surname,
    birthday: new Date(birthday),
    email,
    gender,
    cpf,
    user,
    password: _password
  })
    .then(async () => {
      req.session[user] = { user: 'Usuário criado no cadastro! Faça o login!' }
      try {
        await req.session.save()
        return res.status(204).send()
      } catch (e) {
        console.log(e)
        return res.status(400).render('404')
      }
    })
    .catch(async err => {
      if (err.code === 11000) {
        if ('cpf' in err.keyPattern) {
          req.session[user] = { cpf: 'CPF já consta no cadastro!' }
          try {
            await req.session.save()
            return res.status(204).send()
          } catch (e) {
            console.log(e)
            return res.status(400).render('404')
          }
        }
        if ('userName' in err.keyPattern) {
          req.session[user] = { user: 'Usuário já consta no cadastro!' }
          try {
            await req.session.save()
            return res.status(204).send()
          } catch (e) {
            console.log(e)
            return res.status(400).render('404')
          }
        }
      }
      if (err.name === 'ValidationError') {
        if ('cpf' in err.errors) {
          return res.status(204).send()
        }
      }
      console.log(err)
      return res.status(400).render('404')
    })
}
