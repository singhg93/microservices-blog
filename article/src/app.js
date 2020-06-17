const express = require('express');
const app = express();
const PORT = 3030;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/Article');
const router = require('./routes/article.js')

mongoose.connect('mongodb://article_db/test', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// router.get('/', (req, res) => res.json({message: 'Hello, World!'}));

router.use(function(req, res, next) {
    console.log(req.path);
    next();
});

//app.use('/article', router);
app.use('/', router);


app.listen(PORT, function() {
    console.log("Server listening on " + PORT);
});
