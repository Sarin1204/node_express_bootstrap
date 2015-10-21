/**
 * Created by sarin on 10/17/15.
 */
var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    model = require('express-cassandra');

module.exports = function(){
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    }, function(accessToken, refreshToken, profile, done){
        console.log("Google profile info == "+JSON.stringify(profile));
        var provider_data = profile._json;
        var person = model.instance.Person.findOne({username: profile.id},function(err, person){
            if(err)
                return done(err)
            if (person){
                return done(null,person)
            }
            else{
                var new_person = new model.instance.Person({
                    username : provider_data.id,
                    firstname : provider_data.name.givenName,
                    lastname : provider_data.name.familyName,
                    email : provider_data.emails[0].value
                })
                new_person.save(function(err){
                    if(err){
                        console.log('Error message in signup');
                        return res.redirect('/signup');
                    }
                    return done(null, new_person);
                })
            }
        })
    }))
}