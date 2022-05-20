const NewsComments = require("../models/NewsComments");
const User = require("../models/User");
const express = require("express");
const verfiy = require('../middlewares/verify');
const router = express.Router();

<<<<<<< HEAD
router.get("/:newsId", async (req, res) => {
  try {
    if (req.body.newsId === req.params.newsId) {
      const comments = await NewsComments.find({
        newsId: req.params.newsId,
      });
      if (!comments) {
        return res.status(404).json("Not Found");
      }
      return res.status(200).json(comments);
    } else {
      return res.status(401).json({ msg: "Unauthorized" });
=======
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
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
    }
  } catch (error) {
    return res.status(500).json("Server Error!");
  }
});

<<<<<<< HEAD
//Post the new comment
router.post("/:newsId/:userId", async (req, res) => {
  try {
    if (
      req.body.newsId === req.params.newsId &&
      req.body.userId === req.params.userId
    ) {
      let newComment;
=======
//Post the new comment 
router.post('/:newsId/:userId',verfiy,async (req,res)=>{
    try {
        if(req.body.user){

            let newComment;
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9

      if (req.body.parentCommentId) {
        console.log("parentComment is present!");
        newComment = new NewsComments({
          newsId: req.body.newsId,
          userId: req.body.userId,
          parentCommentId: req.body.parentCommentId,
          content: req.body.content,
        });
        await newComment.save();
      } else {
        console.log("parentComment is NOT present!");
        newComment = new NewsComments({
          newsId: req.body.newsId,
          userId: req.body.userId,
          content: req.body.content,
        });
        await newComment.save();
      }
      return res.status(200).json(newComment);
    } else {
      return res.status(401).json("Unauthorized!");
    }
  } catch (error) {
    return res.status(500).json("Server Error!");
  }
});

//Delete news comment
<<<<<<< HEAD
router.delete("/:newsId/:commentId", (req, res) => {
  try {
    if (
      req.body.newsId === req.params.newsId &&
      req.body.commentId === req.params.commentId
    ) {
      User.findById(req.body.userId).then((user) => {
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(401).json("Unauthorized!");
=======
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
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
        }
      });
    } else {
      return res.status(401).json("Unauthorized!");
    }
  } catch (error) {
    return res.status(500).send({ msg: "server error!" });
  }
});

module.exports = router;
