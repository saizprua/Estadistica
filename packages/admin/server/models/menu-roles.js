'use strict';

module.exports = function(sequelize, DataTypes) {

    var MenuRoles = sequelize.define('menuRoles',
        {
            menu_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                notEmpty: true
            },
            role_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                notEmpty: true
            }
        },
        {
            tableName:'menu_roles',
            associate: function(models) {
                MenuRoles.belongsTo(models.menu,{ foreignKey: 'menu_id', onDelete: 'cascade'});
                MenuRoles.belongsTo(models.roles,{ foreignKey: 'role_id', onDelete: 'cascade'});
            }
        }
    );

    return MenuRoles;
};
