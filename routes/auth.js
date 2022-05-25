const express = require('express');
const {createToken} = require('../security/crypto');
const bcrypt = require("bcrypt")
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
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password,salt)
        console.log(password);
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:password
        })
        await user.save();
        return res.status(200).json(user.username);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({
            email:req.body.email,
        })
        if(!user){
            return res.status(404).json("User not found!");
        }
        const comp = await bcrypt.compare(req.body.password,user.password)
        if(comp){
            const auth = createToken(user);
            const {_id,username} = user;
            return res.status(200).json({_id,username,auth});
        }
        return res.status(401).json("Unauthorized!");
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;