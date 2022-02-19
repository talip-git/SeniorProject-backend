const express = require('express');
const ForumComments = require('../models/ForumComments');

const router = express.Router();

//Get the all the Forum comments
router.get('/forum/:forumId/',async(req,res)=>{
    try {
        if(req.body.forumId === req.params.forumId){
            const comment = await ForumComments.find({
                forumId:req.params.newsId,
            });
            if(!comment){
                return res.status(404).json("Not Found");
            }
            return res.status(200).json(comment);
        }
        else{
            return res.status(400).json({msg:"Unauthorized"});
        }   
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
});

//Post forum comment
router.post('/forum/:forumId:/commentId',(req,res)=>{

});

//Delete forum comment
router.delete('/forum/:forumId:/commentId',(req,res)=>{

});

module.exports = router;