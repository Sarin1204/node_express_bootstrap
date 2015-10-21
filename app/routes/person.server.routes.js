var person = require('../controllers/person.server.controller'),
    passport = require('passport');

exports.createPerson = function(app) {
    app.get('/createPerson', person.renderPerson)
};

exports.findPerson = function(app) {
    app.get('/findPerson', person.findPerson)

};

exports.signup = function(app) {
    app.route('/signup')
        .get(person.renderSignup)
        .post(person.signup);

};

exports.signin = function(app) {
    app.route('/signin')
        .get(person.renderSignin)
        .post(passport.authenticate('local',{
            successRedirect : '/',
            failureRedirect : '/signin',
            failureFlash: true
        }));

};

exports.signout = function(app){
    app.get('/signout', person.signout)
};

exports.facebooksignin = function(app){
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        scope: ['email'],
        failureRedirect: '/signin'
    }));
    app.get('/oauth/facebook/callback', passport.authenticate('facebook',
        {
            failureRedirect: '/signin',
            successRedirect: '/'
        }));
};

exports.googlesignin = function(app){
    app.get('/oauth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'],
        failureRedirect: '/signin'
    }));
    app.get('/oauth/google/callback',
        passport.authenticate('google', { failureRedirect: '/signin' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
}