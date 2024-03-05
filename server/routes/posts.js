const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// Create Post:

router.post("/create", verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Post:

router.put("/:id", verifyToken, async (req, res) => {
    try {

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        // console.log(updatedPost);
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete Post:

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        
       await Post.findByIdAndDelete(req.params.id);
       await Comment.deleteMany({postId: req.params.id});

        res.status(201).json("Post has been deleted successfully!");
    } catch (error) {
        res.status(501).json(error);
    }
})

// Get Post:
router.get("/:id", async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        res.status(501).json(error);
    }
})

// Get Posts and Search Posts:

router.get("/", async (req, res) => {

    const query = req.query;
    // console.log(query);
    try {
        
        const searchFilter = {
            title: {$regex: query.search, $options: "i"}
        }
        const posts = await Post.find(query.search ? searchFilter : null);
        res.status(201).json(posts);
    } catch (error) {
        res.status(501).json(error);
    }
})


// Get User Posts:

router.get("/user/:userId", async (req, res) => {
    try {
        
        const posts = await Post.find({userId: req.params.userId});
        // console.log(posts);
        res.status(201).json(posts);
    } catch (error) {
        res.status(501).json(error);
    }
})


module.exports = router;