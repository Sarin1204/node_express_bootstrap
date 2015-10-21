/**
 * Created by sarin on 10/18/15.
 */
var person = require('../controllers/person.server.controller'),
    articles = require('../controllers/articles.server.controller');

module.exports = function(app){
    console.log('Inside articles.server.routes')
    app.route('/api/articles')
        .get(articles.list)
        .post(person.requiresLogin,articles.create);
    app.route('/api/articles/:title')
        .get(articles.read)
        .put(person.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(person.requiresLogin, articles.hasAuthorization, articles.delete)
        .post(person.requiresLogin,articles.create);

    app.param('title',articles.articleByTitle);
};