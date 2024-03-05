const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    postId: {
        type: String,
    },
    

    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;