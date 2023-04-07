const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/config.json")[env];

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: "postgres",
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.todos = require("./todo.js")(sequelize, Sequelize);

module.exports = db;
