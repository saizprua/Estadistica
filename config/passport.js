'use strict';
var passport = require('passport');
// These are different types of authentication strategies that can be used with Passport.
var LocalStrategy = require('passport-local').Strategy;
var LDAPStrategy = require('./ldap').Strategy;
var config = require('./config');
var db = require('./sequelize');
var winston = require('./winston');

// Windows LDAP

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    db.User.find({where: {id: id}})
    .then(function(user){
        if(!user) return done('error');
        winston.info('Session: { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
    }).catch(function(err){
        done(err, null);
    });
});

//Use local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    db.User.find({ where: { email: email }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (!user.authenticate(password)) {
        done(null, false, { message: 'Invalid password'});
      } else {
        winston.info('Login (local) : { id: ' + user.id + ', username: ' + user.username + ' }');
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));

passport.use(new LDAPStrategy(
    config.ldap,
    function(profile, done) {
        db.User.find({where:{ldapUserId:profile.sAMAccountType}})
        .then(function (user) {
          if(user) return done(null, user);

          db.User.create({
            ldapUserId: profile.sAMAccountName,
            name: profile.name,
            username: profile.sAMAccountName,
            email : profile.userPrincipalName,
            provider: 'ldap'
          }).then(function (u) {
            winston.info('Login (local) : { id: ' + u.id + ', username: ' + u.username + ' }');
            done(null, u);
          })
          .catch(function (err) {
            done(err,null);
          });

        })
        .catch(function (err) {
          done(err,null);
        });
    }
));

module.exports = passport;
