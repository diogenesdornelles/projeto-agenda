const { User } = require('../models/UserModel')
const bcrypt = require('bcrypt')
// renderize HTML
exports.get_login_page = (req, res) => {
  const { load } = req.params
  if (load === 'loginPage') {
    res.render('login')
  } else res.render('index')
}

exports.post_login = (req, res, next) => {
  const { user, password } = req.body
  User.findOne({
    userName: user
  })
    .then(async data => {
      if (data) {
        if (await bcrypt.compare(password, data.password)) {
          req.session[user] = { user: 'Usuário autenticado!' }
          await req.session.save()
          return res.render('index', {
            logged: true,
            user: data.user,
            id: data._id
          })
        } else {
          req.session[user] = { password: 'Senha incorreta!' }
          try {
            await req.session.save()
            return res.status(204).send()
          } catch (e) {
            console.log(e)
            return res.status(400).render('404')
          }
        };
      } else {
        req.session[user] = { user: 'Usuário incorreto!' }
        try {
          await req.session.save()
          return res.status(204).send()
        } catch (e) {
          console.log(e)
          return res.status(400).render('404')
        }
      }
    }
    )
    .catch(err => {
      console.log(err)
      return res.status(400).render('404')
    })
}
