/**
 * Created by sarin on 10/16/15.
 */
var passport = require('passport'),
    models = require('express-cassandra');

module.exports = function(){

    passport.serializeUser(function(person, done){
        console.log("serial person == "+JSON.stringify(person));
        done(null, person.username);
    });

    passport.deserializeUser(function(username, done){
        console.log('deserial username == '+username);
        models.instance.Person.findOne({username : username}, function(err, Person){
            done(err, Person);
        });
    });
    require('./strategies/local.js')();
    require('./strategies/facebook.js')();
    require('./strategies/google.js')();
};