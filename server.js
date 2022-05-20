const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dontenv = require("dotenv").config();
const db = require("./models");
const User = db.user;
const Role = db.role;
//Routes
const forumEntriesRouter = require("./routes/forumEntries");
const forumCommentsRouter = require("./routes/forumComments");
const newsRouter = require("./routes/news");
const newsCommentsRouter = require("./routes/newsComments");
<<<<<<< HEAD
const authRouter = require("./routes/auth");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
=======
const authRouter = require('./routes/auth');
const conversationRouter = require('./routes/conversations');
const messageRouter = require('./routes/messages');
const userRouter = require('./routes/users')
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
const app = express();

//Connect To The DB
mongoose
  .connect(
    "mongodb+srv://sinoposta:12345@cluster0.gjxb8.mongodb.net/PredatorDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    initial();
    console.log("Connected to the db!");
  })
  .catch(() => {
    console.log("an error happened");
  });

//Cors
const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

//Middleware
<<<<<<< HEAD
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/api/news", newsRouter);
app.use("/api/forum", forumEntriesRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/comments/news", newsCommentsRouter);
app.use("/api/comments/forum", forumCommentsRouter);



function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.listen(5000, () => {
  console.log("Server is runnig on port " + 5000 + "...");
});
=======
app.use(cors(corsOptions))
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use('/api/auth',authRouter);
app.use('/api/news',newsRouter);
app.use('/api/forum',forumEntriesRouter);
app.use('/api/conversations',conversationRouter);
app.use('/api/messages',messageRouter);
app.use('/api/comments/news',newsCommentsRouter);
app.use('/api/comments/forum',forumCommentsRouter);
app.use('/api/users',userRouter)
/**
 * Token Test
 * 
 */
// app.post("/createToken",(req,res)=>{
//     const encryptedData = createToken(req.body.user);
//     res.setHeader("Set-Cookie","auth="+encryptedData)
//     return res.status(200).json(encryptedData);
// })
// app.post("/verifyToken",async (req,res)=>{
//     const token = req.headers["cookie"].split("=")[1];
//     const decUser = JSON.parse(decryptToken(token));
//     const user = await User.findById(decUser._id);
//     if(user){
//         return res.status(200).send(user);
//     }
//     return res.status(403).json("Unauthorized!");
// })

app.listen(process.env.PORT,()=>{
    console.log('Server is runnig on port '+ process.env.PORT+'...')
})
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
