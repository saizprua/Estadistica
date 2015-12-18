
'use strict';

/**
* Module dependencies.
*/
var passport = require('passport');

module.exports = function(app) {
// User Routes
var users = require('../controllers/users');

app.get('/api/users/me', users.me);

// Setting up the users api
// app.post('/api/register', users.create);

app.route('/api/logout')
  .get(users.signout);

app.route('/api/login')
       .post(passport.authenticate('local', {
           failureFlash: true
       }), users.login);


app.route('/api/login/ldap')
.post(passport.authenticate('ldap', {failureFlash: true}),users.login);

app.route('/api/loggedin')
      .get(function(req, res) {
          res.send(req.isAuthenticated() ? req.user : '0');
      });
// Finish with setting up the userId param
app.param('userId', users.user);
};
