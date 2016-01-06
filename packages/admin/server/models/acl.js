'use strict';

module.exports = function(sequelize, DataTypes) {

    var Acl = sequelize.define('acl',
        {

            role_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                notEmpty: true,
                unique: 'role_ruta'
            },
            ruta:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
                unique: 'role_ruta'
            },
            metodos:{
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true
            }

        },
        {
            tableName:'acl',
            associate: function(models) {
                Acl.belongsTo(models.roles,{
                    foreignKey: 'role_id',
                    onDelete: 'cascade'
                });
            },
        }
    );

    return Acl;
};
