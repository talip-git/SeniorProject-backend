const mongoose = require('mongoose');
const ForumEntriesSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        min:10,
        max:70
    },
    img:{
        type:String,
    },
},{timestamps:true});

module.exports=mongoose.model('ForumEntry',ForumEntriesSchema);