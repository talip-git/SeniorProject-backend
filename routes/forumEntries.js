const express = require('express')
const ForumEntry = require('../models/ForumEntries');
const router = express.Router();

router.get('/getForum',async (req,res)=>{
    try {
        const entries = await ForumEntry.find({})
        if(!entries){
            return res.status(404).json("Not Found!")
        }
        return res.status(200).json(entries)
    } catch (error) {
        return res.status(500).json(error)
    }
})


//Get The Entry
router.get("/getForum/:forumId",(req,res)=>{
    try {
        ForumEntry.findById(req.params.forumId)
        .then((entry)=>{
                return res.status(200).json(entry);
        })
        .catch((error)=>{
                return res.status(404).json(error);
        });
    } catch (error) {
        return res.status(500).json(error)
    }
});

//Post new Forum Entry
router.post("/addForum/:userId",async(req,res)=>{
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

