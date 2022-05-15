const express = require("express")
const router = express.Router()
const News = require('../models/news')

router.get('/getNews',async (req,res)=>{
    try {
        const products = await News.find({});
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).json(error)
    }

})
router.post('/addNews',async(req,res)=>{
    try { 
        const newNews = new News({
            userId:req.body.userId,
            title:req.body.title,
            content:req.body.content,
            img:req.body.img,
        })
        await newNews.save()

        return res.status(200).json('New news added succesfully!')
    } catch (error) {
        return res.status(500).send(error)
    }    
})
router.get('/induvidualNews/:id',async (req,res)=>{
    try {
        News.findById(req.params.id)
        .then((news)=>{
                return res.status(200).json(news);
        })
        .catch((error)=>{
                return res.status(404).json(error);
        });
    
       
    } catch (error) {
        return res.status(500).json(error)
    }
})
module.exports = router;