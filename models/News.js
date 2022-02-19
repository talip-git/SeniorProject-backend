const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports= mongoose.model('News',NewsSchema);