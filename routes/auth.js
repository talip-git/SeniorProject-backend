const express = require("express");
const User = require("../models/User");
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
    }
    return res.status(401).json("Unauthorized!");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
