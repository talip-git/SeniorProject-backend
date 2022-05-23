const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controllers");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Content-Type : application/json");
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
};
