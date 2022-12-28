exports.get_advice_register = async (req, res) => {
  while (typeof req.session[req.params.userName] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params.userName]); 
  delete req.session[req.params.userName];
  try {
    await req.session.save();
  } catch (e) {
    console.log(e)
  }
} 

exports.get_advice_login = async (req, res) => {
  while (typeof req.session[req.params.userName] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params.userName]); 
  delete req.session[req.params.userName];
  try {
    await req.session.save();
  } catch (e) {
    console.log(e)
  }
} 

exports.get_advice_contact = async (req, res) => {
  while (typeof req.session[req.params.cpf] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params.cpf]); 
  delete req.session[req.params.cpf];
  try {
    await req.session.save();
  } catch (e) {
    console.log(e)
  }
} 

exports.get_advice_event = async (req, res) => {
  while (typeof req.session[req.params._idContact] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params._idContact]); 
  delete req.session[req.params._idContact];
  try {
    await req.session.save();
  } catch (e) {
    console.log(e)
  }
} 

exports.get_advice_attevent = async (req, res) => {
  while (typeof req.session[req.params._idContact] === undefined) {
    setTimeout(() => {}, 500)
  }
  res.status(200).json(req.session[req.params._idContact]); 
  delete req.session[req.params._idContact];
  try {
    await req.session.save();
  } catch (e) {
    console.log(e)
  }
} 




