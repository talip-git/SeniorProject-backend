const express = require('express');
const Message = require('../models/Message');
const router = express.Router()

router.post('/',async (req,res)=>{
    try {
        const message =  new Message({
            conversationId:req.body.conversationId,
            senderId:req.body.senderId,
            text:req.body.text
        })
        await message.save();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json(error);
    }
})
router.get('/:conversationId',async(req,res)=>{
    try {
        if(req.body.conversationId === req.params.conversationId){            
            const messages = await Message.find({
                conversationId:req.body.conversationId
            });
            if(!messages){
                return res.status(404).json("Not found!")
            }
            return res.status(200).json(messages);
        }
        return res.status(401).json("Unauthorized!");
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;