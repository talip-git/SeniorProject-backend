const express = require('express');
const helmet =  require('helmet');
const morgan = require('morgan');

const app = express();

app.use(morgan("dev"));
app.use(helmet());

app.get('/',(req,res)=>{
    res.send({msg:'Hello From The Server'});
})

app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
})