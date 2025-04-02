const accountQueries = require("./account.queries");
// const { sequelize } = require("../../config/database");

const accountService = {
  async getAccountByPin(id, pin) {
    console.log("id", id);
    console.log("pin", pin);
    const account = await accountQueries.getBankAccountWithPinVerification(
      id,
      pin
    );
    console.log("account", account);
    return account;
  },
};

module.exports = accountService;
