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
    content:{
        type:String,
        required:true,
    },
    subComments:{
        type:Array,
        default:[ForumCommentsSchema]
    }
},{timestamps:true});
module.exports = mongoose.model("ForumComment",ForumCommentsSchema);