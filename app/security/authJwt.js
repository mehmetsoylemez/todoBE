const jwt = require("jsonwebtoken");
const config = require("../config/security.json");
const ForbiddenError = require("../middleware/error/ForbiddenError");
const UnAuthorizedError = require("../middleware/error/UnAuthorizedError");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    throw new ForbiddenError("No Token Provided");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      throw new UnAuthorizedError("Unauthorized User");
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
