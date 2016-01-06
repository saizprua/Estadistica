
'use strict';


module.exports = function(app) {

    var admin = require('../controllers/admin')(app);
    var acl = require('../../../../config/acl');
    var params = require('../controllers/params');
    var roles = require('../controllers/roles');

    app.route('/api/routes/all').all(acl.isAllowed)
        .get( admin.routes);

    app.route('/api/config').all(acl.isAllowed)
        .get(params.query)
        .put(params.update);

    app.route('/api/acl').all(acl.isAllowed)
        .get(admin.getAcl)
        .post(admin.save)
        .put(admin.update)
        .delete(admin.destroy);

    app.route('/api/roles').all(acl.isAllowed)
        .get(roles.query)
        .post(roles.save)
        .put(roles.update)
        .delete(roles.destroy);
};
