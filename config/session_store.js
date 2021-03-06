
var MysqlStore = require('express-mysql-session');
var config = require('./config');

var options = {
    host: config.db.host?config.db.host:'localhost',
    port: config.db.port?config.db.port:3306,
    user: config.db.username,
    password: config.db.password,
    database: config.db.name,
    checkExpirationInterval: 600000, //en milisegundos (10 min),
    expiration: config.expressSessionExpiration //en milesegundos(30 min)
};

var sessionStore = new MysqlStore(options);
module.exports = sessionStore;
