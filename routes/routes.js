module.exports = function(app, passport){

app.get('/', function(req, res){
  res.status(200)
  .json({
    status: 'success',
    message: 'your app ready to use'
  });
});

  app.get('/profile', isLoggedIn, function(req, res){
    res.status(200)
    .json({
      status: 'success',
      user: req.user
    });
  });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

  app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
});
};

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/');
}
