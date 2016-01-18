'use strict';
var db = require('../../../../config/sequelize');


exports.mrquery = function (req, res) {
    db.menuRoles.findAll({
        include:[{
            model: db.menu
        },{
            model: db.roles
        }]
    })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.mrsave = function (req, res) {
    db.menuRoles.create(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.mrdelete = function (req, res) {
    db.menuRoles.destroy({where:{id: req.query.menuRoleId}})
        .then(function () {
            res.json({success:true});
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};


exports.tree = function (req, res) {
  db.menu.findAll({
      where:{parent_id: null},
      attributes: ['name','icon', 'is_public'],
      include: [{
          model: db.menu,
          attributes: ['name', 'path','icon', 'is_public'],
          include:[{
              model: db.menu,
              attributes: ['name', 'path', 'icon', 'is_public']
          }]
      }]
  })
      .then(function (data) {
          res.json(data);
      })
      .catch(function (err) {
          res.status(500).send(err);
      });
};

exports.protected = function (req, res) {
  db.menu.findAll({
      where: {
          is_public: false,
          path:{$not:null }
      }
  })
      .then(function (data) {
          res.json(data);
      })
      .catch(function (err) {
          res.status(500).send(err);
      });
};


exports.query = function (req, res) {
    db.menu.findAll({})
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });

};

exports.update = function (req, res) {
    var body = req.body;
    if(!body.is_child) {
        body.parent_id = null;
        body.path = null;
    }
  db.menu.update(body,{
      where:{id: body.id}
  })
      .then(function () {
          res.json(body);
      })
      .catch(function (err) {
          res.status(500).send(err);
      });
};


exports.delete = function (req, res) {
    db.menu.destroy({where:{id: req.query.menuId}})
        .then(function () {
            res.json({success:true});
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.save = function (req, res) {
    var body = req.body;
    if(!body.is_child) {
        body.parent_id = null;
        body.path = null;
    }

    db.menu.create(body)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};