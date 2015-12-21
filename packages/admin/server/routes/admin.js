
'use strict';

module.exports = function(app) {

  var admin = require('../controllers/admin')(app);
  app.get('/api/routes/all', admin.routes);

  app.route('/api/acl')
      .get(admin.getAcl);

};