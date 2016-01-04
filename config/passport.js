'use strict';
var passport = require('passport');
// These are different types of authentication strategies that can be used with Passport.
var LocalStrategy = require('passport-local').Strategy;
var LDAPStrategy = require('./ldap').Strategy;
var config = require('./config');
var db = require('./sequelize');
var winston = require('./winston');
var _ = require('lodash');

// Windows LDAP

//Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    db.User.find({where: {id: id}})
    .then(function(user){
        if(!user) return done('Permiso Denegado!');
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


        console.log(profile);
          var distinguishedName = getCN(profile.memberOf);


        distinguishedName.forEach(function (rol) {
            db.roles.create({ rol: rol},{ ignore:true});
        });


          db.User.upsert({
            ldapUserId: profile.sAMAccountName,
            name: profile.name,
            username: profile.sAMAccountName,
            email : profile.userPrincipalName,
            roles : distinguishedName.toString(),
            provider: 'ldap'
          }).then(function () {
            db.User.findOne({where:{ldapUserId: profile.sAMAccountName}})
            .then(function (user) {
              done(null, user);
              return null;
            })
            .catch(function (err) {
              done(err,null);
            });

            return null;
          })
          .catch(function (err) {
            done(err,null);
          });

        function getCN(dn){

            var res = [];

            if(typeof dn === 'object'){
                dn.forEach(function (no) {res = _.union(res, getcn(no));});
            }else res = getcn(dn);


            return res;

            function getcn(no){
                return no.split(',')
                    .filter(function (i) { return i.slice(0,2) === 'CN';})
                    .map(function (i) { return i.split('=')[1].trim();});
            }

        }
    }
));

module.exports = passport;
