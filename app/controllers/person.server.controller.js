/**
 * Created by sarin on 10/16/15.
 */

var models = require('express-cassandra'),
    bcrypt = require('bcrypt');

exports.renderPerson = function(req,res){

    var john = new models.instance.Person({
        username : "john.doe",
        password : "pass",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com"});
    john.save(function(err){
        if(err) console.log(err);
        else {
            res.render('index',{
                title: "Person Created",
                person: john
            })

            console.log('Yuppiie!');
        }
    });
};

exports.findPerson = function(req,res) {

    models.instance.People.find({},function(err, people){
        if(err) throw err;
        //Note that returned variable john here is an instance of your model,
        //so you can also do john.delete(), john.save() type operations on the instance.
        //console.log('Found ' + john.name + ' to be ' + john.age + ' years old!');
        console.log("people are == "+JSON.stringify(people))
    });
};

exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next) {
    if (!req.user) {
        var Person = new models.instance.Person(req.body);
        console.log('Person is '+JSON.stringify(Person));
        console.log(JSON.stringify(req.body));
        var message = null;
        Person.provider = 'local';
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(Person.password, salt, function(err, hash){
                Person.password = hash;
                Person.save(function(err){
                    if(err) {
                        console.log('Error message in signup');
                        return res.redirect('/signup');
                    }
                    req.login(Person, function(err){
                        if (err) return next(err);
                        return res.redirect('/');
                    });
                });
            });
        });

    } else {
        return res.redirect('/');
    }
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.requiresLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
}
