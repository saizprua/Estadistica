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
        }
    );

    return Roles;
};

