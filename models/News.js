const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
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
    author:{
        type:String,
        required:true,
    },
    comments:{
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports= mongoose.model('News',NewsSchema);