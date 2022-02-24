const express = require('express')
const ForumEntry = require('../models/ForumEntries');
const router = express.Router();

//Get The Entry
router.get("/:forumId",(req,res)=>{
    try {
        if(req.body.forumId === req.params.forumId){
            ForumEntry.findById(req.body.forumId)
            .then((entry)=>{
                return res.status(200).json(entry);
            })
            .catch((error)=>{
                return res.status(404).json(error);
            });
        }
        else{
            return res.status(401).json("Unauthorized!");
        }
    } catch (error) {
        return res.status(500).json(error)
    }
});

//Post new Forum Entry
router.post("/:userId",(req,res)=>{
    try {
        if(req.body.userId === req.params.userId){
            const newEntry = new ForumEntry({
                userId:req.body.userId,
                title:req.body.title,
                content:req.body.content,
                img:req.body.img
            });
            await newEntry.save();
            return res.status(200).json(newEntry);
        }
        else{
            return res.status(401).json("Unauthorized!");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;

