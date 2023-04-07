const { verifySignUp } = require("../security");
const userController = require("../controllers/user");

module.exports = function (app) {
  app.use(function (req, res, next) {
    try {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    } catch (error) {
      next(error);
    }
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    userController.signup
  );

  app.post("/api/auth/signin", userController.signin);
  app.delete("/api/user/:userId", userController.destroy);
};
