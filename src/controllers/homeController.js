exports.get_home_page = (req, res) => {
  if (req.params.load === 'homePage') {
  res.render('home', {
    title: 'Home',
  });
  } else res.render('_blank', {
    title: ''
  });
}
