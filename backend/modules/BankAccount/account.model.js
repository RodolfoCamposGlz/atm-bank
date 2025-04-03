const { sequelize, Sequelize } = require("../../database/config");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

class BankAccount extends Sequelize.Model {
  async comparePin(candidatePin, hash) {
    return await bcrypt.compare(candidatePin.toString(), hash);
  }
}

BankAccount.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2),
      defaultValue: 0.0,
      validate: {
        min: 0.0,
      },
    },
    accountStatus: {
      type: Sequelize.ENUM("open", "closed"),
      defaultValue: "open",
    },
    cardType: {
      type: Sequelize.ENUM(
        "visa",
        "mastercard",
        "star",
        "pulse",
        "maestro",
        "plus"
      ),
      allowNull: false,
      defaultValue: "Visa", // Default to Visa
    },
    pinNumber: {
      type: Sequelize.STRING(4),
      allowNull: false,
      validate: {
        is: /^\d{4}$/,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "BankAccount",
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["pinNumber"],
      },
    ],
    hooks: {
      beforeCreate: async (account) => {
        if (account.pinNumber) {
          account.pinNumber = await bcrypt.hash(account.pinNumber, SALT_ROUNDS);
        }
      },
      beforeUpdate: async (account) => {
        if (account.changed("pinNumber")) {
          account.pinNumber = await bcrypt.hash(account.pinNumber, SALT_ROUNDS);
        }
      },
    },
  }
);

module.exports = BankAccount;
