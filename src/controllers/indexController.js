exports.get_index_page = (req, res) => {
  res.render('index', {
    logged: false,
    userName: false,
    id: false
  })
}
