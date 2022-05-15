const express = require("express")
const router = express.Router()
const User = require('../models/User')
router.get("/",async(req,res)=>{
    try {
        const users = await User.find({
            username:{$regex:req.query.username}
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/getUser/:userId",async (req,res)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json("Not found!");
        }
        return res.status(200).json(user.username);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router