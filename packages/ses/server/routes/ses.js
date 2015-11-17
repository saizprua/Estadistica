
'use strict';

module.exports = function(app) {
// User Routes
var ses = require('../controllers/ses');

    app.route('/api/ses/all')
    .get(ses.all);

};
