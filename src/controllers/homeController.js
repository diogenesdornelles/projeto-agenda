exports.get_home_page = (req, res) => {
  const { load } = req.params
  if (load === 'homePage') {
    res.render('home', {
      title: 'Home'
    })
  } else {
    res.render('_blank', {
      title: ''
    })
  }
}
