const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');
// renderize HTML
exports.get_login_page = (req, res) => {
  if (req.params.load === 'loginPage') {
  res.render('login');
  }
  else res.render('index');
}

exports.post_login_form = (req, res, next) => {
  User.findOne({ 
    userName: req.body.userName,
  })
  .then(async data => {
    if (data) {
      if ( await bcrypt.compare(req.body.password, data.password)){
        req.session[req.body.userName] = {user: 'Usuário autenticado!'};
        await req.session.save();
        res.render('index', { 
          logged: true,
          userName: data.userName,
          _idUser: data._id,
        })
      } else {
          req.session[req.body.userName] = {password: 'Senha incorreta!'};
          try {
            await req.session.save();
            res.status(204).send();
            return;
          } catch (e) {
            console.log(e);
            res.status(204).send();
          }
        };
    } else {
      req.session[req.body.userName] = {user: 'Usuário incorreto!'};
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
  )
  .catch( err => {console.log(err)
    res.render('404');
  });
}
