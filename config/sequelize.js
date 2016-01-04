'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('./config');
var winston   = require('./winston');
var db        = {};


var models = module.exports = {
  Sequelize: Sequelize,
  init: init
};


function init(callback){

  winston.info('Initializing Sequelize...');

  // create your instance of sequelize
  var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
      host: config.db.host,
      port: config.db.port,
      dialect: 'mysql',
      storage: config.db.storage,
      logging: config.enableSequelizeLog ? winston.verbose : false,
      timezone : config.timezone,
      define: {
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          createdAt: 'fecha_creacion',
          updatedAt: 'fecha_act'
      }
  });

  //create instante in innovacion databse
  var sequelize_innovacion = new Sequelize(config.db_inn.name, config.db_inn.username, config.db_inn.password, {
      host: config.db_inn.host,
      port: config.db_inn.port,
      dialect: 'mysql',
      storage: config.db_inn.storage,
      logging: config.enableSequelizeLog ? winston.verbose : false,
      timezone : config.timezone,
      dialectOptions: {
        insecureAuth: true
      },
      define: {
          timestamps: false,
          freezeTableName: true,
          underscored: true
      }
  });

  // loop through all files in models directory ignoring hidden files and this file


    config.getDirectories(config.root + '/packages').forEach(function(pack){
      var pt = config.root + '/packages/' + pack + '/server/';

        var configModel = [{
          folder: 'models',
          sq: sequelize
        },{
          folder: 'models_innovacion',
          sq: sequelize_innovacion
        }];

        configModel.forEach(function (cm) {
          if(fs.existsSync(pt + cm.folder)){
                readdirSync(pt + cm.folder, cm.sq);
          }
        });


    });


  // invoke associations on each of the models
  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
      db[modelName].options.associate(db);
    }
  });

  // Synchronizing any model changes with database.
  // WARNING: this will DROP your database everytime you re-run your application
  sequelize
    .sync({force: config.forceSequelizeSync})
    .then(function(){
          winston.info('Database '+(config.forceSequelizeSync?'*DROPPED* and ':'')+ 'synchronized');
          models.sequelize = sequelize;
          _.extend(models,db);

            return  sequelize_innovacion
                .sync()
                .then(function () {
                  models.sequelize_innovacion = sequelize_innovacion;
                  winston.info('Database INNOVACION '+(config.forceSequelizeSync?'*DROPPED* and ':'')+ 'synchronized');

                    db.config.findAll()
                        .then(function (conf) {
                            var c = {};
                            conf.forEach(function (i) { c[i.config_item] = i.value_item; });
                            _.extend(config,c);
                            return callback();
                        })
                        .catch(function (err) {
                            winston.error('An error occured: %j',err);
                        })

                })
                .catch(function (err) {
                  winston.error('An error occured: %j',err);
                });

      }).catch(function(err){
          winston.error('An error occured: %j',err);
      });

  //function create models

  function readdirSync(route, sq){
    console.log(route);
    fs.readdirSync(route)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      // import model files and save model names
      .forEach(function(file) {
        winston.info('Loading model file ' + file);
        var model = sq.import(path.join(route, file));
        db[model.name] = model;
      });
  }
}
