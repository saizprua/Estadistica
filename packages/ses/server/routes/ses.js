
'use strict';

module.exports = function(app) {
// User Routes
var ses = require('../controllers/ses');

    app.route('/api/ses/all')
    .get(ses.all);

    app.route('/api/ses/solicitudes')
    .get(ses.solcitudes);

    app.route('/api/ses/generales')
    .get(ses.generales);

};
