'use strict';
/**
 * Module dependencies.
 */
var db = require('../../../../config/sequelize');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};


exports.login = function(req, res) {
    res.json({
        user: req.user,
        redirect: req.get('referer')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    console.log('Logout: { id: ' + req.user.id + ', username: ' + req.user.username + '}');
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
//exports.create = function(req, res) {
//
//    var user = db.User.build(req.body);
//
//    user.provider = 'local';
//    user.salt = user.makeSalt();
//    user.hashedPassword = user.encryptPassword(req.body.password, user.salt);
//    console.log('New User (local) : { id: ' + user.id + ' username: ' + user.username + ' }');
//
//    user.save().then(function(){
//      req.logIn(user, function(err){
//        if(err) {
//          console.log(err);
//          return res.status(400).json(err);
//        }
//        res.json(user);
//      });
//    }).catch(function(err){
//        console.log(err);
//        res.status(400).json(err);
//    });
//};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    db.User.find({where : { id: id }}).then(function(user){
      if (!user) {
        return next(new Error('Failed to load User ' + id));
      }
      req.profile = user;
      next();
    }).catch(function(err){
      next(err);
    });
};

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
