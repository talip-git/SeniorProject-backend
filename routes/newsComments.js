const NewsComments = require('../models/NewsComments');
const User = require("../models/User");
const express = require("express");
const verfiy = require('../middlewares/verify');
const router = express.Router();

router.get('/:newsId',async (req,res)=>{
    try {
        const comments = await NewsComments.find({
            newsId:req.params.newsId,
        });
        if(!comments){
            return res.status(404).json("Not Found");
        }
        return res.status(200).json(comments);  
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
});

//Post the new comment 
router.post('/:newsId/:userId',verfiy,async (req,res)=>{
    try {
        if(req.body.user){

            let newComment;

            if(req.body.parentCommentId){
                console.log("parentComment is present!");
                newComment = new NewsComments({
                    newsId:req.body.newsId,
                    userId:req.body.userId,
                    parentCommentId:req.body.parentCommentId,
                    content:req.body.content
                });
                await newComment.save();
            }
            else{
                console.log("parentComment is NOT present!");
                newComment = new NewsComments({
                    newsId:req.body.newsId,
                    userId:req.body.userId,
                    content:req.body.content
                });
                await newComment.save();
            }
            return res.status(200).json(newComment);
        }
        else{
            return res.status(401).json("Unauthorized!");
        }
    } catch (error) {
        return res.status(500).json("Server Error!")
    }
});

//Delete news comment
router.delete('/:newsId/:commentId',verfiy,(req,res)=>{
    try {
        if(req.body.user){
             User.findById(req.body.userId)
            .then((user)=>{
                if(user){
                    return res.status(200).json(user);
                }
                else{
                    return res.status(401).json("Unauthorized!");
                }
            });
        }
        else{
            return res.status(401).json("Unauthorized!");
        }
    } catch (error) {
        return res.status(500).send({msg:"server error!"});
    }
});

module.exports = router;