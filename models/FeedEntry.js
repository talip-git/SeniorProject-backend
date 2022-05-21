const mongoose = require('mongoose')

const FeedSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Array
    },
    interacts:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model("Feed",FeedSchema);