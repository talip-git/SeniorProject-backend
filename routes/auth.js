<<<<<<< HEAD
const express = require("express");
const User = require("../models/User");
=======
const express = require('express');
const {createToken} = require('../security/crypto');
const User = require('../models/User');
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
const router = express.Router();
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignUp");

function checkDuplicate(req, res, next) {
  // Username
  console.log(req.body);
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // Email
    console.log("EMAİL", req.body.email);
    console.log("USERNAME", req.body.username);
    console.log("PASSWORD", req.body.password);
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
}
function verifyToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
}

<<<<<<< HEAD
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/register", checkDuplicate, async (req, res) => {
  try {
    console.log(req.body.username);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // if (!passwordIsValid) {
    //   return res.status(401).send({
    //     accessToken: null,
    //     message: "Invalid Password!",
    //   });
    // }

    if (!user) {
      return res.status(404).json("User not found!");
    }
    if (user.password === req.body.password) {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log(token);
      user.accessToken = token;
      return res
        .header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        )
        .status(200)
        .send({
          id: user._id,
          username: user.username,
          accessToken: token,
        });
=======
router.post('/register',async(req,res)=>{
    try {
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        await user.save();
        return res.status(200).json(user.username);
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
            const auth = createToken(user);
            const {_id,username} = user;
            return res.status(200).json({_id,username,auth});
        }
        return res.status(401).json("Unauthorized!");
    } catch (error) {
        return res.status(500).json(error);
>>>>>>> 95addf601100b65ab8ab32ba6842bfcd8bbc74e9
    }
    return res.status(401).json("Unauthorized!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//TODO FUNCTIONS
router.post("/getUserCredentials",async(req,res)=>{
  try{
    console.log("BARTU",req.body.username)
    const user = User.findOne({username:req.body.username},function(err,doc){
      if(err) throw err;
      if(doc){
        console.log(doc)
        console.log("Found: "+doc.username)
        return res.status(200).send({
          username: doc.username,
          email: doc.email,
          password: doc.password,
          isAdmin: doc.isAdmin,
          destination:doc.destination,
          phonenumber:doc.phonenumber,
          age:doc.age
        });
      }
      else
          console.log("Not found: "+req.body.username);
   
  });
    
  }
  catch{
    return res.status(500).send("User not found !");
  }
})
router.post("/changeUserCredentials",async(req,res)=>{
try{
  console.log("Username",req.body.username)
  console.log("New Username",req.body.newusername)
  console.log("New Email",req.body.newEmail);
  console.log("New Destination",req.body.newdestination)
 const user=User.findOneAndUpdate({id:req.body.id},{$set: {
    username:req.body.newusername,
    age:req.body.newage,
    destination:req.body.newdestination,
    phonenumber: req.body.newphonenumber,
    email:req.body.newemail
  }}).then(res.status(200).json("OK"))
  
  

  if(!user){
    return res.status(404).json("User not found!");
  }
  
  
}
catch(error){
  console.log(error)
  return res.status(500).json(error);
}
});

router.post("/changeEmail",async(req,res)=>{
  try{
    
   const user=User.findOneAndUpdate({username:req.body.username},{$set: {
      email: req.body.newemail,
    }}).then(res.status(200).json("OK"));
  
    if(!user){
      return res.status(404).json("User not found!");
    }
    
    
  }
  catch(error){
    console.log(error)
    return res.status(500).json(error);
  }
  });

  router.post("/changePassword",async(req,res)=>{
    try{
      console.log(req.body.password);
      console.log(req.body.newpassword)
      let user = await User.findOne({
        username: req.body.username,
      });
      if(!user){
        res.status(404).json("User not found !")
      }
      // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      // if (!passwordIsValid) {
      //   return res.status(401).send({
      //     message: "Invalid Password!",
      //   });
      // }
      if (user.password === req.body.password) {
        user = User.findOneAndUpdate({username:req.body.username},{$set:{
          password:req.body.newpassword
        }})
        return res.status(200).send("OK");
      }
      else{
        res.status(401).send("Failed! Password is incorrect" );
      }
      

    }
  catch(error){
    return res.status(500).json(error)
  }
  
  })

module.exports = router;
