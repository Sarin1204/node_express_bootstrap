/**
 * Created by sarin on 10/13/15.
 */
var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    CassandraStore = require("cassandra-store")(session);

module.exports = function () {
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    var options = {
        "contacPoints": ["127.0.0.1"],
        "keyspace": "tests"
    };
    var cassandrastore = new CassandraStore(options);
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: cassandrastore
    }));


    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes').home(app);
    require('../app/routes/index.server.routes').createPerson(app);
    //require('../app/routes/index.server.routes').findPerson(app);
    require('../app/routes/index.server.routes').createParty(app);
    require('../app/routes/index.server.routes').createPeople(app);

    require('../app/routes/person.server.routes').findPerson(app);
    require('../app/routes/person.server.routes').signin(app);
    require('../app/routes/person.server.routes').signup(app);
    require('../app/routes/person.server.routes').signout(app);
    require('../app/routes/person.server.routes').facebooksignin(app);
    require('../app/routes/person.server.routes').googlesignin(app);

    require('../app/routes/articles.server.routes')(app);

    app.use(express.static('./public'));
    require('./socketio')(server, io, cassandrastore);
    return server;
};