const express = require('express');
const helmet =  require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const dontenv = require('dotenv').config();
const app = express();

const newsRouter  = require('./routes/news')

//Connect To The DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to the db!");
})
.catch(()=>{
    console.log("an error happened");
});


const corsOptions = {
    origin:"http://localhost:3000",
    optionSuccessStatus:200
}

app.get('/',(req,res)=>{
    res.send({msg:'Hello From The Server'});
})



app.use(cors(corsOptions))
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use('/api/news',newsRouter)
let port = process.env.PORT

app.listen(port,()=>{
    console.log('Server is runnig on port '+ port +'...')
})