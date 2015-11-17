'use strict';

module.exports = function(sequelize, DataTypes) {

	var Solictud = sequelize.define('solicitud',
		{
      id_solicitud:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        notEmpty: true
      },
      id_asignacion:{
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
      },
      fecha_solicitud:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '0000-00-00'
      },
      nombre_solicitante:{
        type: DataTypes.STRING,
        allowNull:false
      },
      cargo_solicitante:{
        type: DataTypes.STRING,
        allowNull:false
      },
      telefono_solicitante:{
        type: DataTypes.STRING(20),
        allowNull:false
      },
      telefono2_solicitante:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      telefono3_solicitante:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      telefono4_solicitante:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      email_solicitante:{
        type: DataTypes.STRING,
        allowNull:false
      },
      email_solicitante2:{
        type: DataTypes.STRING,
        allowNull:false
      },
      email_solicitante3:{
        type: DataTypes.STRING,
        allowNull:false
      },
      tipo_solicitud:{
        type: DataTypes.STRING,
        allowNull:false
      },
      sub_tipo_sol:{
        type: DataTypes.STRING(50),
        allowNull:false
      },
      prioridad:{
        type: DataTypes.STRING(20),
        allowNull:false
      },
      monto_solicitud:{
        type: DataTypes.FLOAT(11,2),
        allowNull : false
      },
      id_entidad:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      antecedente:{
        type: DataTypes.STRING(20),
        allowNull:false
      },
      num_sol_bs:{
        type: DataTypes.STRING(255),
        allowNull: false
      },
      ipAdd:{
        type: DataTypes.STRING(50),
      }


		},
		{
			tableName:'solicitud',

      associate: function(models) {
				Solictud.belongsTo(models.asignacion,{
          foreignKey: 'id_asignacion',
          onDelete: 'cascade'
        });

        Solictud.belongsTo(models.entidad,{
          foreignKey: 'id_entidad',
          onDelete: 'cascade'
        });
			}
		}
	);

	return Solictud;
};
