const BankAccount = require("../modules/BankAccount/account.model");

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await BankAccount.sync({ force: true });

  //insert data
  await Promise.all([
    // Add BankAccount seed data
    BankAccount.create({
      id: 1,
      firstName: "Harry",
      lastName: "Potter",
      balance: 1150.0,
      accountStatus: "open",
      pinNumber: "1234", // In production, this should be hashed
    }),
    BankAccount.create({
      id: 2,
      firstName: "Mr",
      lastName: "Robot",
      balance: 231.11,
      accountStatus: "open",
      pinNumber: "4321",
    }),
    BankAccount.create({
      id: 3,
      firstName: "John",
      lastName: "Snow",
      balance: 451.3,
      accountStatus: "open",
      pinNumber: "0000",
    }),
    BankAccount.create({
      id: 4,
      firstName: "Ash",
      lastName: "Ketchum",
      balance: 1.3,
      accountStatus: "open",
      pinNumber: "1111",
    }),
    BankAccount.create({
      id: 5,
      firstName: "Tony",
      lastName: "Stark",
      balance: 1000000.0,
      accountStatus: "open",
      pinNumber: "9999",
    }),
    BankAccount.create({
      id: 6,
      firstName: "Bruce",
      lastName: "Wayne",
      balance: 5000000.0,
      accountStatus: "open",
      pinNumber: "8888",
    }),
  ]);
}
