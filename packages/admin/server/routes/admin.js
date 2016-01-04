
'use strict';


module.exports = function(app) {

    var admin = require('../controllers/admin')(app);
    var acl = require('../../../../config/acl');
    var params = require('../controllers/params');

    app.route('/api/routes/all').all(acl.isAllowed)
        .get( admin.routes);


    app.route('/api/acl').all(acl.isAllowed)
        .get(admin.getAcl)
        .post(admin.save);

    app.route('/api/acl/:aclId').all(acl.isAllowed)
        .put(admin.update)
        .delete(admin.destroy);


    app.route('/api/config/:configId').all(acl.isAllowed)
        .put(params.updateConfig)

    app.route('/api/config').all(acl.isAllowed)
        .get(params.getConfig);


    app.route('/api/roles').all(acl.isAllowed)
        .get(params.roles);




};
