
var session = require('express-session'),
    config = require('./../config'),
    sessionStore = require('./../session_store');

var sessionMiddleware = session({
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{maxAge:config.expressSessionExpiration}, //remember for 7 days
    secret: config.expressSessionSecret/*||'$uper$ecret$e$$ionKey'*/
});

module.exports = sessionMiddleware;
