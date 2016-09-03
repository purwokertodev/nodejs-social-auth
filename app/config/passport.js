var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwiterStrategy = require('passport-twitter').Strategy;
var User = require('../model/user');
var UserRepository = require('../repository/user_repository');

var configAuth = require('../config/auth');

var userRepository = new UserRepository();

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    userRepository.findOne(id,function(err, result){
      done(err, result);
    });
  });

  passport.use(new FacebookStrategy({
      clientID        : configAuth.facebookAuth.clientID,
      clientSecret    : configAuth.facebookAuth.clientSecret,
      callbackURL     : configAuth.facebookAuth.callbackURL,
      profileFields   : configAuth.facebookAuth.profileFields
  }, function(token, refreshToken, profile, done){
    console.log('profile pic '+profile.photos[0].value);
    process.nextTick(function(){
      userRepository.findOne(profile.id, function(err, result){

        if(!err && result !== null){
          return done(null, result);
        }else{
          var apiType = "FACEBOOK";
          var newUser = new User(profile.id, apiType, token, profile.emails[0].value, profile.displayName);
          userRepository.createUser(newUser, function(err, result){
            if(err){
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new GoogleStrategy({
    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL
  }, function(token, refreshToken, profile, done){
    console.log('profile pic '+profile.photos[0].value);
    process.nextTick(function(){
      userRepository.findOne(profile.id, function(err, result){

        if(!err && result !== null){
          return done(null, result);
        }else{
          var apiType = "GOOGLE";
          var newUser = new User(profile.id, apiType, token, profile.emails[0].value, profile.displayName);
          userRepository.createUser(newUser, function(err, result){
            if(err){
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new TwiterStrategy({
    consumerKey    : configAuth.twitterAuth.consumerKey,
    consumerSecret : configAuth.twitterAuth.consumerSecret,
    callbackURL    : configAuth.twitterAuth.callbackURL
  }, function(token, refreshToken, profile, done){
    process.nextTick(function(){
      userRepository.findOne(profile.id, function(err, result){

        if(!err && result !== null){
          return done(null, result);
        }else{
          var apiType = "TWITTER";
          var newUser = new User(profile.id, apiType, token, profile.emails[0].value, profile.displayName);
          userRepository.createUser(newUser, function(err, result){
            if(err){
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
