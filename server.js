var express = require("express");
const bodyParser = require("body-parser");
var logger = require("morgan");
const {
  logError,
  logUnhandledError,
  returnError,
  isOperationalError
} = require("./app/middleware/error/errorHandler");
const userRoute = require("./app/routes/user");
const todoRoute = require("./app/routes/todo");
var cors = require("cors");

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to todos application." });
});

userRoute(app);
todoRoute(app);

// global exception handling
app.use(logError);
app.use(returnError);

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  logUnhandledError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
