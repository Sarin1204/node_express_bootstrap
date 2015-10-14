/**
 * Created by sarin on 10/13/15.
 */
module.exports = function(app) {
    var index = require('../controllers/index.server.controller')
    app.get('/', index.render);
};