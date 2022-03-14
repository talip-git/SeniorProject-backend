const express = require('express');
const ForumComments = require('../models/ForumComments');
const router = express.Router();

//Get the all the Forum comments
router.get('/:forumId',async(req,res)=>{
    try {
        const comments = await ForumComments.find({
            forumId:req.params.forumId,
        });
        if(!comments){
            return res.status(404).json("Not Found");
        }
        return res.status(200).json(comments);
         
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
});

//Post forum comment
router.post('/:forumId/:userId',async (req,res)=>{
    try {
        if(req.body.forumId === req.params.forumId && 
            req.body.userId === req.params.userId){
            if(req.body.parentCommentId){
                const newcomment = new ForumComments({
                    forumId:req.body.forumId,
                    userId : req.body.userId,
                    parentCommentId:req.body.parentCommentId,
                    content:req.body.content
                });
                await newcomment.save();
                return res.status(200).json(newcomment);
            }
            else{
                const newcomment = new ForumComments({
                    forumId:req.body.forumId,
                    userId : req.body.userId,
                    content:req.body.content
                })
                await newcomment.save();
                return res.status(200).json(newcomment);
            }
        }
        else{
            return res.status(401).json("Unathroized!")
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Delete forum comment
router.delete('/:forumId:/commentId',(req,res)=>{

});

module.exports = router;