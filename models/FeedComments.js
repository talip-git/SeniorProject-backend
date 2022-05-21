const mongoose = require('mongoose')

const FeedCommentSchema = mongoose.Schema({
    feedId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true
    },
    parentCommentId:{
        type:String
    },
    content:{
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model("FeedComment",FeedCommentSchema);