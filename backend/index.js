const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./database/config");
const accountController = require("./modules/BankAccount/account.controller");
dotenv.config();

const app = express();

app.set("sequelize", sequelize);
app.set("models", sequelize.models);
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/api/v1/accounts", accountController.getAccountByPin);
app.post("/api/v1/withdraw", accountController.withdrawMoney);
app.post("/api/v1/deposit", accountController.depositMoney);
app.listen(8000, () => {
  console.log("server listening on port 8000");
});
