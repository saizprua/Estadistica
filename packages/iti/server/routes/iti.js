
'use strict';

module.exports = function(app) {
// User Routes

  var iti = require('../controllers/iti');
  var acl = require('../../../../config/acl');

  app.route('/api/iti').all(acl.isAllowed)
      .get(iti.all)
      .post(iti.create)
      .put(iti.update)
      .delete(iti.delete);

  app.route('/api/iti/year').all(acl.isAllowed)
  .get(iti.year);


};
