const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        ref: 'User'
    },
    text: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;