exports.get_advice_register = async (req, res) => {
  const { user } = req.params
  while (!req.session[user]) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[user])
  delete req.session[user]
  try {
    await req.session.save()
    return
  } catch (e) {
    console.log(e)
    return res.status(400).render('404')
  }
}

exports.get_advice_login = async (req, res) => {
  const { user } = req.params
  while (!req.session[user]) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[user])
  delete req.session[user]
  try {
    await req.session.save()
    return
  } catch (e) {
    console.log(e)
    return res.status(400).render('404')
  }
}

exports.get_advice_contact = async (req, res) => {
  const { cpf } = req.params
  while (!req.session[cpf]) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[cpf])
  delete req.session[cpf]
  try {
    await req.session.save()
    return
  } catch (e) {
    console.log(e)
    return res.status(400).render('404')
  }
}

exports.get_advice_event = async (req, res) => {
  const { id } = req.params
  while (!req.session[id]) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[id])
  delete req.session[id]
  try {
    await req.session.save()
    return
  } catch (e) {
    console.log(e)
    return res.status(400).render('404')
  }
}

exports.get_advice_attevent = async (req, res) => {
  const { id } = req.params
  while (!req.session[id]) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[id])
  delete req.session[id]
  try {
    await req.session.save()
    return
  } catch (e) {
    console.log(e)
    return res.status(400).render('404')
  }
}
