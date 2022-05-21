const express = require("express");
const FeedComments = require("../models/FeedComments");
const verfiy = require('../middlewares/verify');
const router = express.Router()

router.get('/getAll/:feedId',async(req,res)=>{
    try {
        const comments = await FeedComments.find({
            feedId:req.params.feedId,
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
router.get('/:feedId',async(req,res)=>{
    try {
        const comments = await FeedComments.find({
            forumId:req.params.feedId,
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
router.get('/:feedId/:parentCommentId',async(req,res)=>{
    try {
        const comments = await FeedComments.find({
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
router.post('/:feedId/:userId',verfiy,async (req,res)=>{
    try {
        if(req.body.user){
            if(req.body.parentCommentId){
                const newcomment = new FeedComments({
                    feedId:req.body.feedId,
                    userId : req.body.userId,
                    userName:req.body.username,
                    parentCommentId:req.body.parentCommentId,
                    content:req.body.content
                });
                await newcomment.save();
                return res.status(200).json(newcomment);
            }
            else{
                const newcomment = new FeedComments({
                    feedId:req.body.feedId,
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


module.exports=router;