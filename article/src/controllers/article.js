const Article = require('../models/Article');
const _ = require('lodash');

exports.getAllArticles = function(req, res) {
    Article.find(function(err, articles){
        if (err) {
            res.json({message: "Error while retrieving artiles"});
        } else {
            res.json(articles);
        }
    });
}

exports.getArticleById = function(req, res) {
    res.json({message: "Getting article by id"});
}

exports.getArticlesForAuthor = function(req, res) {
    res.json({message: "Getting all articles for author"});
}

exports.updateArticle = function(req, res) {
    res.json({message: "Coming soon"});
}

exports.deleteArticle = function(req, res) {
    res.json({message: "Coming soon"});
}

exports.addArticle = function(req, res) {
    var data = req.body;

    var article = new Article();
    article.title = data.title;
    article.description = data.description;
    article.content = data.content;
    article.author_id = data.author_id;

    article.save(function(err) {
        if (err) {
            res.json({message: "Error while saving the article"});
        } else {
            res.json({message: "Article saved"});
        }
    });
}
