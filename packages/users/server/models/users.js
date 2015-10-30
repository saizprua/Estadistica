'use strict';
/**
	* User Model
	*/

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User',
		{
			name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: true,
				isEmail: true,
				notEmpty: true
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				notEmpty: true
			},
			hashedPassword: DataTypes.STRING,
			provider: DataTypes.STRING,
			salt: DataTypes.STRING,
			ldapUserId: DataTypes.INTEGER
		},
		{
			tableName:'user',
			instanceMethods: {
				makeSalt: function() {
					return crypto.randomBytes(16).toString('base64');
				},
				authenticate: function(plainText){
					return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
				},
				encryptPassword: function(password, salt) {
					if (!password || !salt){
						return '';
					}
					salt = new Buffer(salt, 'base64');
					return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
				}
			},
			// associate: function(models) {
			//
			// }
		}
	);

	return User;
};
