const mongoose = require('mongoose')


const ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author_id: Number
});

module.exports = mongoose.model('Article', ArticleSchema);
