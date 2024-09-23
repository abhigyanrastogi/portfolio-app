const mongoose = require("mongoose");
const userSchema = require("./User").schema;

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: false
    },
    comments: [{
        type: commentSchema,
        required: false
    }]
});

module.exports = mongoose.model('Post', postSchema);