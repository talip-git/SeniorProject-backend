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
    content:{
        type:String,
        required:true,
    },
    subComments:{
        type:Array,
        default:[NewsCommentsSchema]
    }
},{timestamps:true});
module.exports = mongoose.model("NewsComment",NewsCommentsSchema);