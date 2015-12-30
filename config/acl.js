'use strict';

//Module dependencies.
var acl = require('acl');
var _ = require('lodash');
var when = require('when');
var db = require('./sequelize');

// Using the memory backend
acl = exports.acl = new acl(new acl.memoryBackend());



exports.invokeRolesPolicies = function (callback) {
        acl.allow([{
            roles: ['Julio Sena','Lidia Serrano'],
            allows: [{
                resources: [
                    '/api/iti',
                    '/api/iti/year',
                    '/api/iti/:itiId',
                    '/api/acl',
                    '/api/acl/:aclId',
                    '/api/routes/all'
                ],
                permissions: '*'
            }]
        },{
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
