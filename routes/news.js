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
                title:req.body.title,
                content:req.body.content,
                imgUrl:req.body.imgUrl,
                comments: req.body.comments
            })
            await newNews.save()

            return res.status(200).json('New news added succesfully!')
        
        
    } catch (error) {
        return res.status(500).send(error)
    }    
})
router.delete('/deleteNews/:title',async(req,res)=>{
    try {
            await News.findByIdAndDelete(req.body.title)
            return res.status(200).json('News with given title is deleted succesfully!')
        
    } catch (error) {
        return res.status(500).send(error)
    }    
}) 

module.exports = router;