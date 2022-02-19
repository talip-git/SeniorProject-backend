const mongoose = require('mongoose');
const NewsCommentsSchema = mongoose.Schema({
    newsId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },
    parentCommentId:{
        type:String
    },
    content:{
        type:String,
        required:true,
    },
},{timestamps:true});
module.exports = mongoose.model("NewsComment",NewsCommentsSchema);