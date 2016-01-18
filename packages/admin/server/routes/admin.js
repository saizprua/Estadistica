
'use strict';


module.exports = function(app) {

    var admin = require('../controllers/admin')(app);
    var acl = require('../../../../config/acl');
    var params = require('../controllers/params');
    var roles = require('../controllers/roles');
    var menu = require('../controllers/menu');
    var user = require('../../../users/server/controllers/users');

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

    app.route('/api/menu-roles').all(acl.isAllowed)
        .delete(menu.mrdelete)
        .post(menu.mrsave);

    app.route('/api/menu').all(acl.isAllowed)
        .put(menu.update)
        .post(menu.save)
        .delete(menu.delete);

};
