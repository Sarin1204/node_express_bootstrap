/**
 * Created by sarin on 10/16/15.
 */
var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    person = require('../../app/controllers/person.server.controller'),
    models = require('express-cassandra');

module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'emails', 'name']
    },
    function(token, refreshToken, profile, done){
        console.log("Facebook profile info == "+JSON.stringify(profile));
        var provider_data = profile._json;
        models.instance.Person.findOne({
            'username' : profile.id
        }, function(err, person){
            if(err){
                return done(err)
            }
            if (person){
                return done(null, person);
            } else{

                var new_person = new models.instance.Person({
                    username : provider_data.id,
                    firstname : provider_data.first_name,
                    lastname : provider_data.last_name,
                    email : provider_data.email
                });
                new_person.save(function(err){
                    if(err) {
                        console.log('Error message in signup');
                        return res.redirect('/signup');
                    }
                    return done(null, new_person);
                })
            }
        })
    }));
};