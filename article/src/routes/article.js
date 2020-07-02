const express = require('express');
const router = express.Router();
const controllers = require('../controllers/article.js');


router.route('/all')
    .get(controllers.getAllArticles);

router.route('/:articleId')
    .get(controllers.getArticleById);

router.route('/author/:authorId(\d+)')
    .get(controllers.getArticlesForAuthor);

router.route('/update')
    .put(controllers.updateArticle);

router.route('/delete/:articleId')
    .delete(controllers.deleteArticle);

router.route('/create')
    .post(controllers.addArticle);

module.exports = router;
