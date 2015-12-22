
'use strict';

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


    app.get('/api/test/acl/:role', function (req, res) {
        acl.acl.whatResources(req.params.role, function (err, data) {
            res.json(data);
        });
    });

    app.get('/api/clear/acl/:role', function (req, res) {
        acl.acl.removeAllow('Innovacion','/api/acl',function (err) {
            if(err) return res.status(500).send(err);
            res.json('ok');
        });
    });


};
