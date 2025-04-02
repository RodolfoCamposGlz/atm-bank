const { Op, Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite3",
});

module.exports = {
  sequelize,
  Sequelize,
  Op,
  QueryTypes,
};
