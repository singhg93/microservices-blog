const Article = require('../models/Article');
const _ = require('lodash');

exports.getAllArticles = function(req, res) {
    Article.find(function(err, articles){
        if (err) {
            res.status(400).json({message: "Error while retrieving artiles"});
        } else {
            res.status(200).json(articles);
        }
    });
}

exports.getArticleById = function(req, res) {
    const articleId = req.params.articleId;
    Article.findById( articleId, function(err, article) {
        if (err) {
            res.status(400).json({message: "Something went wrong please try again"});
        } else {
            res.status(200).json(article);
        }
    });
}

exports.getArticlesForAuthor = function(req, res) {
    const authorId = res.params.authorId;
    Article.find().byAuthor(authorId).exec(function(err, articles) {
        if (err) {
            res.status(400).json({
                message: "Something went wrong please try again",
            });
        } else {
            res.status(200).json(articles);
        }
    });
}

exports.updateArticle = function(req, res) {
    res.status(200).json({message: "Coming soon"});
}

exports.deleteArticle = function(req, res) {
    const articleId = req.params.articleId;
    Article.deleteOne({
        _id: articleId
    }, function(err, deleteStatus) {
        console.log(deleteStatus);
        console.log(err);
        if (deleteStatus.ok === 1) {
            res.status(200).json({message: "Article deleted"});
        } else {
            res.status(400).json({message: "Something went wrong please try again"});
        }
    });
}

exports.addArticle = function(req, res) {
    var data = req.body;

    var article = new Article();
    article.title = data.title;
    article.post_img_url = data.post_img_url;
    article.description = data.description;
    article.content = data.content;
    article.author_id = data.author_id;

    article.save(function(err) {
        if (err) {
            res.status(400).json({message: "Error while saving the article"});
        } else {
            res.status(200).json({message: "Article saved"});
        }
    });
}
