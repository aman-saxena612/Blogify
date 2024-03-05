const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register:

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = User({username, email, password: hashedPassword});
        const savedUSer = await newUser.save();

        res.status(201).json(savedUSer);

    } catch (error) {
        res.status(500).json(error);
    }
})


// Login:

router.post("/login", async (req ,res) => {
   try {
     const user = await User.findOne({email: req.body.email});
 
     if(!user){
        return res.status(402).json("User not found!");
     }
 
     const matchPassword = await bcrypt.compare(req.body.password, user.password);
 
     if(!matchPassword){
         return res.status(401).json("Incorrect email or password!");
     }
 
     const token = jwt.sign({_id: user._id, username: user.username, email: user.email}, process.env.SECRET, 
         {expiresIn: "3d"});
 
         const {password, ...info} = user._doc;
 
         res.cookie("jToken", token).status(201).json(info);
   } catch (error) {
    res.status(501).json(error);
   }
})


// Logout:

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("jToken", {sameSite: "none", secure: true }).status(201).send("User Logged Out Successfully!");
    } catch (error) {
        res.status(502).json(error);
    }
})

// Refetch User:

router.get("/refetch", (req, res) => {
    const token = req.cookies.jToken;

    jwt.verify(token, process.env.SECRET, (err, data) => {

        if(err){
            return res.status(403).json(err);
        }

        return res.status(201).json(data);
    })
})

module.exports = router;