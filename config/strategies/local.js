/**
 * Created by sarin on 10/16/15.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('express-cassandra');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done){
        console.log("local js username == "+username+" password == "+password);
    models.instance.Person.findOne({username : username}, function(err, person){
        console.log("local js person found is "+JSON.stringify(person));
        if (err) {
            return done(err);
        }

        if (!person) {
            return done(null, false, {
                message: 'Unknown user'
            });
        }
        if (person.password !== password){
            console.log('invalid password')
            return done(null, false, {
                message: 'Invalid Password'
            });
        }
        return done(null, person);
        });
    }));
};