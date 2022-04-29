const {decryptToken} = require('../Security/crypto');
const User = require('../models/User')
const verfiy = async (req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(403).json("Unauthorized!");
        }
        const token = req.headers.authorization
        const user_req = JSON.parse(decryptToken(token));
        const user = await User.findOne({
            _id:user_req._id,
            username:user_req.username,
            password:user_req.password,
            email:user_req.email,
            isAdmin:user_req.isAdmin
        })
        if(user){
            req.body.user = user;
            return next();
        }
        return res.status(403).json("Unauthorized");
    } catch (error) {
        return res.status(500).json("An error happened while verifying the user!")
    }
}
module.exports = verfiy;