
'use strict';


module.exports = function(app) {

    var admin = require('../controllers/admin')(app);
    var acl = require('../../../../config/acl');
    var params = require('../controllers/params');
    var roles = require('../controllers/roles');
    var menu = require('../controllers/menu');
    var user = require('../../../users/server/controllers/users');

    app.route('/api/routes/all')
        .get(acl.isAllowed, admin.routes);

    app.route('/api/config')
        .get(acl.isAllowed,params.query)
        .put(acl.isAllowed,params.update);

    app.route('/api/acl')
        .get(acl.isAllowed, admin.getAcl)
        .post(acl.isAllowed, admin.save)
        .put(acl.isAllowed, admin.update)
        .delete(acl.isAllowed, admin.destroy);

    app.route('/api/roles')
        .get(acl.isAllowed, roles.query)
        .post(acl.isAllowed, roles.save)
        .put(acl.isAllowed, roles.update)
        .delete(acl.isAllowed, roles.destroy);

    app.route('/api/menu')
        .get(user.requiresLogin, menu.query);

    app.route('/api/menu-tree')
        .get(user.requiresLogin, menu.tree);

    app.route('/api/menu-protected')
        .get(user.requiresLogin, menu.protected);

    app.route('/api/menu-roles')
        .get(user.requiresLogin, menu.mrquery);

    app.route('/api/acl/roles')
        .get(user.requiresLogin, admin.getAclRoles);

    app.route('/api/menu-roles')
        .delete(acl.isAllowed, menu.mrdelete)
        .post(acl.isAllowed, menu.mrsave);

    app.route('/api/menu')
        .put(acl.isAllowed, menu.update)
        .post(acl.isAllowed, menu.save)
        .delete(acl.isAllowed, menu.delete);

};
