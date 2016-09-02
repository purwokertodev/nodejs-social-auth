var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var con = 'postgres://postgres:postgres@localhost:5432/facebook_client';
var db = pgp(con);

module.exports = db;
