/**
 * Created by Julio on 4/1/16.
 */

'use strict';
//roles
module.exports = function(sequelize, DataTypes) {


    var Roles = sequelize.define('roles',
        {
            rol:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique:true
            }
        },
        {
            associate: function(models) {
                Roles.hasMany(models.acl,{
                    onDelete: 'cascade'
                });
                Roles.hasMany(models.menuRoles,{
                    onDelete: 'cascade'
                });
            }
        }
    );

    return Roles;
};

