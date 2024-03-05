const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

// Create Comment:

router.post("/create", verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Comment:

router.put("/:id", verifyToken, async (req, res) => {
    try {

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete Comment:

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        
       await Comment.findByIdAndDelete(req.params.id);

        res.status(201).json("Comment has been deleted successfully!");
    } catch (error) {
        res.status(501).json(error);
    }
})


// Get Post Comments:

router.get("/post/:postId", async (req, res) => {
    try {
        
        const comments = await Comment.find({postId: req.params.postId});
        res.status(201).json(comments);
    } catch (error) {
        res.status(501).json(error);
    }
})



router.get("/post", async (req, res) => {
    try {
        
        const comments = await Comment.find();
        res.status(201).json(comments);
    } catch (error) {
        res.status(501).json(error);
    }
})


module.exports = router;