module.exports = {
    'facebookAuth':{
      'clientID' 		: '', // your App ID
  		'clientSecret' 	: '', // your App Secret
      'callbackURL' : 'http://localhost:3000/auth/facebook/callback',
      'profileFields': ['id','displayName', 'photos', 'email']
    },
    'twitterAuth' : {
  		'consumerKey' 		: 'your-consumer-key-here',
  		'consumerSecret' 	: 'your-client-secret-here',
  		'callbackURL' 		: 'http://localhost:3000/auth/twitter/callback'
  	},

  	'googleAuth' : {
  		'clientID' 		: 'your-secret-clientID-here',
  		'clientSecret' 	: 'your-client-secret-here',
  		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
  }
};
