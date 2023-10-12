const mongoose = require('mongoose');

const articleSchama = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Article = mongoose.model('Article', articleSchama);
module.exports = Article;