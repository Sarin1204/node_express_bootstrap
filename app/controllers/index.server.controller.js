/**
 * Created by sarin on 10/13/15.
 */
exports.renderCassandra = function(req,res) {

    var cassandra = require('cassandra-driver');

    var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
    client.connect(function(err, result){
        console.log('index: cassandra connected');
    });

    var getAllUsers = 'SELECT * FROM my_status.users';

    if (req.session.lastVisit){
        console.log(req.session.lastVisit)
    }
    req.session.lastVisit = new Date();

    client.execute(getAllUsers,[],function(err, result){
        if (err){
            res.status(404).send({msg: err});
        }
        else{
            console.log("Rows retrieved: "+JSON.stringify(result.rows));
            res.render('index', {
                title: 'Hello World',
                users: result.rows
            })
        }
    })
};

exports.render = function(req, res) {
    console.log('user is '+JSON.stringify(req.user));
    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });
};

exports.renderPerson = function(req,res){

    var models = require('express-cassandra');

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
            });

            console.log('Yuppiie!');
        }
    });
};

exports.findPerson = function(req,res) {
    var models = require('express-cassandra');

    models.instance.Person.find({name: 'John'}, function(err, people){
        if(err) throw err;
        //Note that returned variable john here is an instance of your model,
        //so you can also do john.delete(), john.save() type operations on the instance.
        //console.log('Found ' + john.name + ' to be ' + john.age + ' years old!');
        console.log("people are == "+JSON.stringify(people))
    });
};

exports.renderEvent = function(req, res){
    var models = require('express-cassandra');
    var uuid = require('node-uuid');
    var Event = new models.instance.Event({
        host : "Vipul",
        date : "2015-10-15",
        eventname : "PARTYY!!!!",
        location : "tempe"
    });
    Event.save(function(err){
        if(err) console.log('event save error '+err);
        else {
            res.render('index',{
                title: "Event Created",
                person: Event
            })

            console.log('Yuppiie!');
        }
    });
};

exports.renderPeople = function(req, res) {
    var models = require('express-cassandra');

    var john = new models.instance.People({name: "Vipul", surname: "Doe", age: 32});
    john.save(function(err){
        if(err) console.log(err);
        else {
            res.render('index',{
                title: "People Created",
                person: john
            })

            console.log('Yuppiie!');
        }
    });
}
