const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

//Update User:

router.put("/:id", verifyToken, async (req, res) => {
    try {
        
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete User:

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId: req.params.id});
        await Comment.deleteMany({userId: req.body.id});

        res.status(201).json("User has been deleted successfully!");
    } catch (error) {
        res.status(501).json(error);
    }
})

// Get User:
router.get("/:id", async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);
        const {password, ...info} = user._doc;
        res.status(201).json(info);
    } catch (error) {
        res.status(501).json(error);
    }
})

module.exports = router;