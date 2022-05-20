const express = require('express');
const Conversation = require('../models/Conversation');
const router = express.Router();

router.post('/',async (req,res)=>{
    const conversation = new Conversation({
        members:[req.body.senderId,req.body.recieverId]
    });
    console.log(conversation)
    try {
        const c = await conversation.save();
        return res.status(200).json(c);
    } catch (error) {
        return res.status(500).json(error)
    }
});
router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;