const db = require("../models");
const config = require("../config/security.json");
const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const NotFoundError = require("../middleware/error/NotFoundError");
const { HttpStatusCode } = require("../config/httpstatusCode");
const UnAuthorizedError = require("../middleware/error/UnAuthorizedError");
const BadRequestError = require("../middleware/error/BadRequestError");

exports.signup = (req, res, next) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res
        .status(HttpStatusCode.CREATED)
        .send({ message: "User registered successfully!" });
    })
    .catch((error) => {
      console.log(error);
      throw new BadRequestError("Bad Request for creating user");
    })
    .catch(next);
};

exports.signin = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User Not Found");
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        throw new UnAuthorizedError("Invalid password");
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(HttpStatusCode.OK).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.destroy = (req, res, next) => {
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User Not Found");
      }
      return todo
        .destroy()
        .then(() => res.status(HttpStatusCode.NO_CONTENT_SUCCESS).send())
        .catch((error) => {
          throw new BadRequestError("Bad Request for destroying user");
        });
    })
    .catch((error) => {
      throw new BadRequestError("Bad Request for finding user");
    })
    .catch(next);
};
