
'use strict';


var config = require('../../../../config/config.js');

module.exports = function(app) {

    var admin = require('../controllers/admin')(app);
    var acl = require('../../../../config/acl');

    app.route('/api/routes/all').all(acl.isAllowed)
        .get( admin.routes);


    app.route('/api/acl').all(acl.isAllowed)
        .get(admin.getAcl)
        .post(admin.save);

    app.route('/api/acl/:aclId').all(acl.isAllowed)
        .put(admin.update)
        .delete(admin.destroy);


    app.get('/api/test/config', function (req, res) {
        res.json(config);
    });


};
