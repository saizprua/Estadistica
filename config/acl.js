'use strict';

//Module dependencies.
var acl = require('acl');
var _ = require('lodash');
var when = require('when');
var db = require('./sequelize');

// Using the memory backend
acl = exports.acl = new acl(new acl.memoryBackend());



var routes = exports.routes = [
    '/api/iti',
    '/api/iti/year',
    '/api/iti/:itiId',
    '/api/acl',
    '/api/acl/:aclId',
    '/api/routes/all',
    '/api/config',
    '/api/config/:configId',
    '/api/roles'
];

exports.invokeRolesPolicies = function (callback) {
        acl.allow([{
            roles: ['guest'],
            allows: [{
                resources: ['/api/iti', '/api/iti/year', '/api/iti/:itiId'],
                permissions: ['get']
            }]
        }]);



    db.acl.findAll({})
        .then(function (acls) {
            allowPermison(acls);
            callback();
        })
        .catch(callback);


    db.config.find({where:{config_item: 'adminRole'}})
        .then(function (adminRole) {
            if(adminRole && adminRole.value_item){

                var roles = adminRole.value_item.split(',').map(function (rol) {
                   return rol.trim();
                });

                console.log(roles);

                acl.allow([{
                    roles: roles,
                    allows: [{
                        resources:routes,
                        permissions: '*'
                    }]
                }]);

            }
        })


    function allowPermison(acls){
        var allow = [];
        var group = _.groupBy(acls,'role');
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
        return res.status(401).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
