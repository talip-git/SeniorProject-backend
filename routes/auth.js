const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        if(!user){
            return res.status(404).json("User not found!");
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.post('/register',async(req,res)=>{
    try {
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
})
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!user){
            return res.status(404).json("User not found!");
        }
        if(user.password === req.body.password){
            return res.status(200).json(user);
        }
        return res.status(401).json("Unauthorized!");
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;