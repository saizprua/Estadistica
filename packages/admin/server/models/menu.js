'use strict';

module.exports = function(sequelize, DataTypes) {

    var Menu = sequelize.define('menu',
        {

            name:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: 'view'
            },
            is_child:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                notEmpty: true,
                defaultValue: false
            },
            path: {
                type: DataTypes.STRING,
                unique: 'view'
            },
            parent_id:{
                type: DataTypes.INTEGER
            }

        },
        {
            tableName:'menu',
            associate: function(models) {
                Menu.hasMany(models.menu,{foreignKey: 'parent_id', onDelete: 'cascade'});
                Menu.belongsTo(models.menu,{ foreignKey: 'parent_id', onDelete: 'cascade'});
            }
        }
    );

    return Menu;
};
