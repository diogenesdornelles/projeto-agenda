const { User } = require('../models/UserModel')

exports.middlewareGlobal = (req, res, next) => {
  if (!req.session.logged) {
    req.session.user = {
      logged: false,
      userName: null
    }
  }
  next()
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404')
  }
}

exports.csrfMiddleware = (req, res, next) => {
  const csrfToken = req.csrfToken()
  res.locals.csrfToken = csrfToken
  next()
}

exports.ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end()
  }
  next()
}

exports.loginIsRequired = (req, res, next) => {
  const { load, id } = req.params
  if (load === 'contactBookPage' && id !== 'undefined') {
    User.findOne({
      _id: id
    })
      .then(data => {
        if (data) {
          next()
        } else {
          res.render('contactBook', {
            logged: false,
            contacts: false
          }
          )
        }
      }).catch(err => {
        console.log(err)
        return res.status(400).render('404')
      })
  } else {
    res.render('contactBook', {
      logged: false,
      contacts: false
    }
    )
  }
}
