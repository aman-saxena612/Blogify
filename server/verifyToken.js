const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.jToken;

    if(!token){
       return res.status(403).json("You are not an authenticated user!");
    }

    jwt.verify(token, process.env.SECRET, (err, data) => {
        if(err){
            return res.status(401).json("Token is not valid!");
        }

        req.userId = data._id;
        // console.log(data);
        // console.log("passed!");
        next();
    })
}

module.exports = verifyToken;