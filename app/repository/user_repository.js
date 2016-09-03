var db = require('../config/db');

var UserRepository = function(){

}

UserRepository.prototype = {
  createUser: function(user, cb){
    db.none('INSERT INTO facebook_user(id, api_type, token, email, name) VALUES($1, $2, $3, $4, $5)', [user.id, user.apiType, user.token, user.email, user.name])
    .then(function(result){
      cb(null, null);
    }).catch(function(err){
      cb(err, null);
    });
  },
  findOne: function(id, cb){
    db.one('SELECT * FROM facebook_user WHERE id = $1', id)
    .then(function(result){
      cb(null, result);
    }).catch(function(err){
      cb(err, null);
    });
  }
};

module.exports = UserRepository;
