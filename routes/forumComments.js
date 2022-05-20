const express = require('express');
const ForumComments = require('../models/ForumComments');
const verfiy = require('../middlewares/verify');
const router = express.Router();

router.get('/getAll/:forumId',async(req,res)=>{
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

//Get the all the ParentComments
router.get('/:forumId',async(req,res)=>{
    try {
        const comments = await ForumComments.find({
            forumId:req.params.forumId,
            parentCommentId:{$exists:false,$ne:true}
        });
        if(!comments){
            return res.status(404).json("Not Found");
        }
        return res.status(200).json(comments);
         
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
});

//Get the childComments 
router.get('/:forumId/:parentCommentId',async(req,res)=>{
    try {
        const comments = await ForumComments.find({
            parentCommentId:req.params.parentCommentId
        })
        if(!comments){
            return res.status(404).json("Not Found!")
        }
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error)
    }
})
//Post forum comment
router.post('/:forumId/:userId',verfiy,async (req,res)=>{
    try {
        if(req.body.user){
            if(req.body.parentCommentId){
                const newcomment = new ForumComments({
                    forumId:req.body.forumId,
                    userId : req.body.userId,
                    userName:req.body.username,
                    parentCommentId:req.body.parentCommentId,
                    content:req.body.content
                });
                await newcomment.save();
                return res.status(200).json(newcomment);
            }
            else{
                const newcomment = new ForumComments({
                    forumId:req.body.forumId,
                    userId :req.body.userId,
                    userName:req.body.username,
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