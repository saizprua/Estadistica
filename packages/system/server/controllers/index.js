'use strict';
/**
 * Module dependencies.
 */
var config = require('../../../../config/config.js');

exports.render = function(req, res) {

    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : false,
        isAdmin: isAdmin()
    });

    function isAdmin(){
        var iad = false;
        if(!req.user) return iad;

        var rolesUser = req.user.roles.split(',');
        var rolesForAdmin = config.adminRole.split(',');


        for(var i = 0; i < rolesForAdmin.length; i++){
            var roleAdmin = rolesForAdmin[i].trim();
            if(rolesUser.indexOf(roleAdmin) > -1){
                iad = true;
                break;
            }
        }

        return iad;

    }
};
