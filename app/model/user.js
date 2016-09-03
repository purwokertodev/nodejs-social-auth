
var User = function(id, apiType, token, email, name){
  this.id = id;
  this.apiType = apiType;
  this.token = token;
  this.email = email;
  this.name = name;
}

module.exports = User;
