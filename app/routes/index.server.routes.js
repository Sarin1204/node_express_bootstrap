/**
 * Created by sarin on 10/13/15.
 */
exports.home = function(app) {

    var index = require('../controllers/index.server.controller')
    app.get('/', index.render);
};

exports.createPerson = function(app) {

    var index = require('../controllers/index.server.controller')
    app.get('/createPerson', index.renderPerson)
}

exports.findPerson = function(app) {

    var index = require('../controllers/index.server.controller')
    app.get('/findPerson', index.findPerson)

}

exports.createParty = function(app) {


    var index = require('../controllers/index.server.controller')
    app.get('/createEvent', index.renderEvent)

}

exports.createPeople = function(app) {
    var index = require('../controllers/index.server.controller')
    app.get('/createPeople', index.renderPeople)

}