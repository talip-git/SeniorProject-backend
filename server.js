const express = require('express');
const helmet =  require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dontenv = require('dotenv').config();

//Routes
const forumCommentsRouter = require('./routes/forumComments')
//App
const app = express();

//Connect To The DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to the db!");
})
.catch(()=>{
    console.log("an error happened");
});

//Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use('/api/comments',forumCommentsRouter);


app.listen(process.env.PORT,()=>{
    console.log("Server is listening on port 5000");
})