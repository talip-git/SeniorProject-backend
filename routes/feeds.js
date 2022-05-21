const express = require("express");
const verfiy = require("../middlewares/verify");
const router = express.Router()
const FeedEntry = require('../models/FeedEntry')
router.get("/newest",async(req,res)=>{
    try {
        const aggregated = await FeedEntry.aggregate([
            {
                $sort:{x:1}
            },
            {
                $limit:100
            },
            {
                $sample:{size:10}
            }
        ])
        return res.status(200).json(aggregated);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})
router.get("/popular",async(req,res)=>{
    try {
        const popularDocs = await FeedEntry.find({}).where("interacts").gte("1000");
        return res.status(200).json(popularDocs);
    } catch (error) {
        return res.status(500).json(error);
    }
})
router.get("/random",async(req,res)=>{
    try {
        const randomDocs = await FeedEntry.aggregate([
            {
                $sample:{size:10}
            }
        ])
        return res.status(200).json(randomDocs);
    } catch (error) {
        return res.status(500).json(error);
    }
})
router.get("/getUser/:userId",async (req,res)=>{
    try {
        const feeds = await FeedEntry.find({
            userId:req.params.userId
        })
        return res.status(200).json(feeds);        
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post("/addFeed/:userId",verfiy,async(req,res)=>{
    try {
        if(!req.body.user){
            return res.status(403).json("Unauthorized!!")
        }
        if(req.body.img){
            const feedEntry = {
                userId:req.body.userId,
                username:req.body.username,
                img:req.body.img,
                content:req.body.content,
                likes:[],
                interacts:0
            }
            const entry =new FeedEntry(feedEntry)
            await entry.save()
            return res.status(200).json(entry);
        }
        else{
            const feedEntry = {
                userId:req.body.userId,
                username:req.body.username,
                content:req.body.content,
                likes:[], 
                interacts:0
            }
            const entry =new FeedEntry(feedEntry)
            await entry.save()
            return res.status(200).json(entry);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})
router.post("/like/:feedId/:userId",verfiy,async(req,res)=>{
    try {
        if(!req.body.user){
            console.log(req.body.user);
            return res.status(403).json("Unauthorized!!")
        }
        const feed = await FeedEntry.findByIdAndUpdate(req.params.feedId,{
            $push:{likes:req.params.userId}
        })
        return res.status(200).json(feed);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})
router.post("/increase/:feedId",verfiy,async(req,res)=>{
    try {
        if(!req.body.user){
            return res.status(403).json("Unauthorized!!")
        }
        const feed = await FeedEntry.findByIdAndUpdate(req.params.feedId,{
            $inc:{interacts:1}
        })
        return res.status(200).json(feed);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})
router.get("/getFeed/:feedId",async(req,res)=>{
    try {
        const feed = await FeedEntry.findById(req.params.feedId)
        if(!feed){
            return res.status(404).json("Not Found!")
        }
        return res.status(200).json(feed);
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = router