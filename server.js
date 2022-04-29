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
const authRouter = require("./routes/auth");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const app = express();

//Connect To The DB
mongoose
  .connect(process.env.MONGO_URL)
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

//TODO FUNCTIONS
app.post("/api/changeUsername");
app.post("/api/changeAge");
app.post("/api/changeDestination");
app.post("/api/changeNumber");
app.post("/api/changeEmail");

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

app.listen(process.env.PORT, () => {
  console.log("Server is runnig on port " + process.env.PORT + "...");
});
