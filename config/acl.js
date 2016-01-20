'use strict';

//Module dependencies.
var acl = require('acl');
var _ = require('lodash');
var db = require('./sequelize');
var config = require('./config');

// Using the memory backend
acl = exports.acl = new acl(new acl.memoryBackend());



var routes = exports.routes = [
    '/api/iti',
    '/api/iti/year',
    '/api/acl',
    '/api/routes/all',
    '/api/config',
    '/api/roles',
    '/api/menu',
    '/api/menu-roles'
];

exports.invokeRolesPolicies = function (callback) {
        acl.allow([{
            roles: ['guest'],
            allows: [{
                resources: ['/api/iti', '/api/iti/year'],
                permissions: ['get']
            }]
        }]);



    db.acl.findAll({
        include:[
            {model: db.roles}
        ]
    })
        .then(function (acls) {
            allowPermison(acls);
            callback();
        })
        .catch(callback);


    db.config.find({where:{config_item: 'adminRole'}})
        .then(function (adminRole) {
            var roles = (adminRole && adminRole.value_item) ? trimV(adminRole.value_item) : trimV(config.adminRole);

            acl.allow([{
                roles: roles,
                allows: [{
                    resources:routes,
                    permissions: '*'
                }]
            }]);

            function trimV(text){
                return text.split(',').map(function (rol) {return rol.trim();});
            }
        })


    function allowPermison(acls){
        var allow = [];
        var group = _.groupBy(acls,'role.rol');
        for(var i in group){
            var obj = { roles: [i]};
            var allows = [];

            group[i].forEach(function (value) {
                allows.push({
                    resources: [value.ruta],
                    permissions: value.metodos.split(',')
                });
            });
            obj.allows = allows;
            allow.push(obj);
        }
        acl.allow(allow);
    }



};

// Check If Articles Policy Allows
exports.isAllowed = function (req, res, next) {
  var userGuest = ['guest'];
  var roles = (req.user && req.user.roles) ? _.union(userGuest, req.user.roles.split(',')) : userGuest;

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred.
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
