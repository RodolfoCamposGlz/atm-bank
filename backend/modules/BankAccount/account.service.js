const { sequelize } = require("../../database/config");
const accountQueries = require("./account.queries");
// const { sequelize } = require("../../config/database");

const accountService = {
  async getAccountByPin(id, pin) {
    const account = await accountQueries.getBankAccountWithPinVerification(
      id,
      pin
    );
    return account;
  },
  async withdrawMoney(id, pin, amount) {
    if (amount <= 0) {
      throw new Error("Amount should be more than 0");
    }

    // Retry configuration
    const maxRetries = 5;
    const initialDelay = 500; // milliseconds
    let retryCount = 0;

    // Helper function for delay with exponential backoff
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function attemptTransaction() {
      try {
        return await sequelize.transaction(async (t) => {
          const account =
            await accountQueries.getBankAccountWithPinVerification(id, pin, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          if (!account) {
            throw new Error("Account not found");
          }
          if (amount > account.balance) {
            throw new Error("Insufficient balance");
          }
          account.balance -= amount;
          account.updatedAt = new Date();
          await account.save({ transaction: t });
          return { message: "Withdraw successful" };
        });
      } catch (error) {
        // Check if it's a database lock error
        const isLockError =
          error.name === "SequelizeTimeoutError" ||
          (error.original && error.original.code === "SQLITE_BUSY") ||
          (error.parent && error.parent.code === "SQLITE_BUSY") ||
          (error.message && error.message.includes("database is locked"));

        if (isLockError && retryCount < maxRetries) {
          retryCount++;
          const waitTime = initialDelay * Math.pow(2, retryCount - 1);
          console.log(
            `Database locked, retry attempt ${retryCount}/${maxRetries} after ${waitTime}ms`
          );
          await delay(waitTime);
          return attemptTransaction();
        }

        // If not a lock error or we've exhausted retries, rethrow
        throw error;
      }
    }

    return attemptTransaction();
  },
  async depositMoney(id, pin, amount) {
    if (amount <= 0) {
      throw new Error("Amount should be more than 0");
    }

    // Retry configuration
    const maxRetries = 5;
    const initialDelay = 500; // milliseconds
    let retryCount = 0;

    // Helper function for delay with exponential backoff
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function attemptTransaction() {
      try {
        return await sequelize.transaction(async (t) => {
          const account =
            await accountQueries.getBankAccountWithPinVerification(id, pin, {
              transaction: t,
              lock: t.LOCK.UPDATE,
            });
          if (!account) {
            throw new Error("Account not found");
          }
          account.balance += amount;
          account.updatedAt = new Date();
          await account.save({ transaction: t });
          return { message: "Deposit successful" };
        });
      } catch (error) {
        // Check if it's a database lock error
        const isLockError =
          error.name === "SequelizeTimeoutError" ||
          (error.original && error.original.code === "SQLITE_BUSY") ||
          (error.parent && error.parent.code === "SQLITE_BUSY") ||
          (error.message && error.message.includes("database is locked"));

        if (isLockError && retryCount < maxRetries) {
          retryCount++;
          const waitTime = initialDelay * Math.pow(2, retryCount - 1);
          console.log(
            `Database locked, retry attempt ${retryCount}/${maxRetries} after ${waitTime}ms`
          );
          await delay(waitTime);
          return attemptTransaction();
        }

        // If not a lock error or we've exhausted retries, rethrow
        throw error;
      }
    }

    return attemptTransaction();
  },
};

module.exports = accountService;
