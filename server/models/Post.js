const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String
    },

    img: {
        type: String
    },

    username: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    categories: {
        type:Array
    }
}, {timestamps: true})

const Post = mongoose.model("post", postSchema);

module.exports = Post;