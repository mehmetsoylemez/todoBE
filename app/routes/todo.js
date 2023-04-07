const todosController = require("../controllers/todo");
const { authJwt } = require("../security");

module.exports = function (app) {
  app.use(function (req, res, next) {
    try {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    } catch (error) {
      next(error)
    }
  });

  app.post("/api/todos", [authJwt.verifyToken], todosController.create);
  app.get("/api/todos", [authJwt.verifyToken], todosController.list);
  app.put("/api/todos/:todoId", [authJwt.verifyToken], todosController.update);
  app.delete(
    "/api/todos/:todoId",
    [authJwt.verifyToken],
    todosController.destroy
  );
};
