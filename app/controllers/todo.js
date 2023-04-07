const { HttpStatusCode } = require("../config/httpstatusCode");
const BadRequestError = require("../middleware/error/BadRequestError");
const BaseError = require("../middleware/error/BadRequestError");
const NotFoundError = require("../middleware/error/NotFoundError");

const Todo = require("../models").todos;

module.exports = {
  create(req, res, next) {
    return Todo.create({
      title: req.body.title,
      userId: req.userId
    })
      .then((todo) => res.status(HttpStatusCode.CREATED).send(todo))
      .catch((error) => {
        console.log(error)
        throw new BadRequestError("Bad Request for creating todos");
      })
      .catch(next);
  },

  list(req, res, next) {
    const options = {
      order: [["createdAt", "DESC"]],
    };

    options.where = { userId: req.userId };
    if (req.query.isCompleted) {
      options.where = { ...options.where, isCompleted: req.query.isCompleted };
    }

    return Todo.findAll(options)
      .then((todos) => res.status(HttpStatusCode.OK).send(todos))
      .catch((error) => {
        console.log(error)
        throw new BadRequestError("Bad Request for finding todos");
      })
      .catch(next);
  },

  update(req, res, next) {
    return Todo.findByPk(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          throw new NotFoundError("ToDo Not Found");
        }
        return todo
          .update({...req.body})
          .then(() => res.status(HttpStatusCode.OK).send({...req.body}))
          .catch((error) => {
            console.log(error)
            throw new BadRequestError("Bad Request for updating todos");
          });
      })
      .catch((error) => {
        console.log(error)
        throw new BadRequestError("Bad Request for finding todos");
      })
      .catch(next);
  },

  destroy(req, res, next) {
    return Todo.findByPk(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          throw new NotFoundError("ToDo Not Found");
        }
        return todo
          .destroy()
          .then(() => res.status(HttpStatusCode.NO_CONTENT_SUCCESS).send())
          .catch((error) => {
            console.log(error)
            throw new BadRequestError("Bad Request for deleting todos");
          });
      })
      .catch((error) => {
        console.log(error)
        throw new BadRequestError("Bad Request for finding todos");
      })
      .catch(next);
  },
};
