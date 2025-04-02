const BankAccount = require("../BankAccount/account.model");

async function getBankAccountWithPinVerification(id, pin) {
  const account = await BankAccount.findOne({
    where: { id: id },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const isPinValid = await account.comparePin(pin, account.pinNumber);
  if (!isPinValid) {
    throw new Error("Invalid PIN");
  }

  // Return safe account data after verification
  return {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    balance: account.balance,
    accountStatus: account.accountStatus,
    createdAt: account.createdAt,
  };
}

module.exports = {
  getBankAccountWithPinVerification,
};
