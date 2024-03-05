const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

const app = express();
const port = process.env.PORT || 8001;

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
}

// Middlewares:
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/posts/", postRoute);
app.use("/api/comments/", commentRoute);


//image upload using multer:

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, req.body.img);
    //   cb(null, "pexels-jess-bailey-designs-839443.jpg");
    }
  })

  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(201).json("Image uploaded successfully!");
  })

// app.get("/", (req, res) => {
//     res.status(201).send("Backend setup successfully!");
// })


app.listen(port, () => {
    connectDB();
    console.log(`Server is running at port ${port}`)
})