const mongoose = require('mongoose');
const ForumCommentsSchema = mongoose.Schema({
    forumId:{
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
module.exports = mongoose.model("ForumComment",ForumCommentsSchema);