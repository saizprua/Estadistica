
'use strict';

module.exports = function(app) {
// User Routes

  var iti = require('../controllers/iti');
  var users = require('../../../users/server/controllers/users');

  app.route('/api/iti')
    .get(iti.all)
    .post(users.requiresLogin, iti.create);

  app.route('/api/iti/year')
  .get(iti.year);

  app.route('/api/iti/:itiId')
    .put(users.requiresLogin,iti.update)
    .delete(users.requiresLogin, iti.delete);



};
