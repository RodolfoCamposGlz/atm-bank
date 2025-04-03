const { Op, Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

module.exports = {
  sequelize,
  Sequelize,
  Op,
  QueryTypes,
};
