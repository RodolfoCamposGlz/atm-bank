const BankAccount = require("../BankAccount/account.model");

async function getBankAccountWithPinVerification(id, pin, transaction) {
  const account = await BankAccount.findOne({
    where: { id: id },
    ...transaction,
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const isPinValid = await account.comparePin(pin, account.pinNumber);
  if (!isPinValid) {
    throw new Error("Invalid PIN");
  }

  return account;
}

module.exports = {
  getBankAccountWithPinVerification,
};
