const express = require('express');
const helmet =  require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dontenv = require('dotenv').config();

//Routes
const forumEntriesRouter = require("./routes/forumEntries");
const forumCommentsRouter = require('./routes/forumComments')
const newsRouter  = require('./routes/news')
const newsCommentsRouter = require("./routes/newsComments");
const authRouter = require('./routes/auth');
const app = express();

//Connect To The DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to the db!");
})
.catch(()=>{
    console.log("an error happened");
});

//Cors
const corsOptions = {
    origin:"http://localhost:3000",
    optionSuccessStatus:200
}

//Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use('/api/auth',authRouter);
app.use('/api/news',newsRouter);
app.use('/api/forum',forumEntriesRouter);
app.use('/api/comments/news',newsCommentsRouter);
app.use('/api/comments/forum',forumCommentsRouter);

app.listen(process.env.PORT,()=>{
    console.log('Server is runnig on port '+ port +'...')
})