const express = require('express');
const Conversation = require('../models/Conversation');
const router = express.Router();

router.post('/',async (req,res)=>{
    const conversation = new Conversation({
        members:[req.body.senderId,req.body.recieverId]
    });
    try {
        await conversation.save();
        return res.status(200).json(conversation);
    } catch (error) {
        return res.status(500).json(error)
    }
});
router.get('/:conversationId',async(req,res)=>{
    try {
        if(req.body.conversationId === req.params.conversationId){
            const conversation = await Conversation.findById(req.body.conversationId);
            if(!conversation){
                return res.status(404).json("Not found!");
            }
            return res.status(200).json(conversation);
        }
        return res.status(401).json("Unauthorized!");
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = router;