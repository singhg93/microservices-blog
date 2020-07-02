const mongoose = require('mongoose')


const ArticleSchema = new mongoose.Schema({
    title: String,
    post_img_url: String,
    description: String,
    content: String,
    posted_date: Date,
    author_id: Number
});

ArticleSchema.query.byAuthor = function(authorId) {
    return this.where({author_id: authorId});
}

module.exports = mongoose.model('Article', ArticleSchema);
