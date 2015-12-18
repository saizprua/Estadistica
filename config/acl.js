'use strict';

//Module dependencies.
var acl = require('acl');
var _ = require('lodash');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

//Invoke Permissions
acl.allow([{
  roles: ['IT_Administradores','Direccion Gobernanza'],
  allows: [{
    resources: ['/api/iti', '/api/iti/year', '/api/iti/:itiId'],
    permissions: '*'
  }]
},{
  roles: ['guest'],
  allows: [{
    resources: ['/api/iti', '/api/iti/year', '/api/iti/:itiId'],
    permissions: ['get']
  }]
}]);

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
