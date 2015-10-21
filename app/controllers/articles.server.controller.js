/**
 * Created by sarin on 10/18/15.
 */
var models = require('express-cassandra');

exports.create = function(req,res){
    var article = new models.instance.article(req.body);
    article.creator = req.user.username
    article.save(function(err){
        if(err){
            console.log('Error creating article'+err);
            return res.status(400).send({
                message: err
            });
        } else{
            res.json(article);
        }
    })
};

exports.list = function(req,res) {
    models.instance.article.find({},function(err, articles){
        if(err){
            return res.status(400).send({
                message: err
            });
        }
        else {
            res.json(articles)
        }
    })
};

exports.articleByTitle = function(req, res, next, title){
    models.instance.article.findOne({title: title}, function(err, article){
        if(err) {
            return res.status(400).send({
                message: err
            });
        }
        else{
            req.article = article;
            next();
        }
    })
};

exports.read = function(req, res){
    res.json(req.article);
};

exports.update = function(req, res) {
    var article = req.article;
    var query_object = {title: article.title};
    var update_values_object = {content: req.body.content}
    models.instance.article.update(query_object,update_values_object,function(err){
            if(err) {
                return res.status(400).send({
                    message: err
                });
            }
            else{
                res.json(article);
            }
        }
    )
}

exports.delete = function(req, res){
    var article = req.article;
    var query_object = {title: article.title};
    moels.instance.article.delete(query_object, function(err){
        if(err){
            return res.status(400).send({
                message: err
            });
        }
        else{
            res.json(article);
        }
    })
};

exports.hasAuthorization = function(req, res, next){
    if(req.article.creator !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
}