// EXAMPLE:
exports.middlewareGlobal = (req, res, next) => {
  if (!req.session.logged) {
    req.session.user = {
      logged: false,
      userName: null,
    }
  }
  next();
}

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }
}

exports.csrfMiddleware = (req, res, next) => {
  const csrfToken = req.csrfToken();
  res.locals.csrfToken = csrfToken;
  next();
}

exports.ignoreFavicon = (req, res, next) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
}
