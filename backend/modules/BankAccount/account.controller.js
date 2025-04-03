const accountService = require("./account.service");

const getAccountByPin = async (req, res) => {
  // 1. Validate request body
  if (!req.body || !req.body.id || !req.body.pin) {
    return res.status(400).json({
      status: "error",
      message: "Missing id or pin in request body",
    });
  }

  const { id, pin } = req.body;

  try {
    // 2. Attempt to get account
    const account = await accountService.getAccountByPin(id, pin);

    // 3. Handle service-level errors
    if (account?.error) {
      return res.status(404).json({
        status: "not found",
        message: account.error,
      });
    }

    // 4. Return successful response
    return res.status(200).json({
      status: "success",
      data: account,
    });
  } catch (err) {
    // 5. Handle unexpected errors
    console.error("Account fetch error:", err);
    return res.status(404).json({
      status: "error",
      message: "Invalid PIN",
    });
  }
};

const withdrawMoney = async (req, res) => {
  // 1. Validate request body
  if (!req.body || !req.body.id || !req.body.pin || !req.body.amount) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields (id, pin, or amount)",
    });
  }

  const { id, pin, amount } = req.body;

  // 2. Validate amount is a positive number
  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Amount must be a positive number",
    });
  }

  try {
    // 3. Attempt to withdraw money
    const result = await accountService.withdrawMoney(id, pin, Number(amount));

    // 4. Handle service-level errors (if your service returns error objects)
    if (result?.error) {
      const statusCode = result.error.includes("not found") ? 404 : 400;
      return res.status(statusCode).json({
        status: "error",
        message: result.error,
      });
    }

    // 5. Return successful response
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    // 6. Handle unexpected errors
    console.error("Withdrawal error:", err);

    // Handle known error messages
    if (
      err.message.includes("Insufficient balance") ||
      err.message.includes("Amount should be more than 0") ||
      err.message.includes("Account not found")
    ) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error while processing withdrawal",
    });
  }
};

const depositMoney = async (req, res) => {
  // 1. Validate request body
  if (!req.body || !req.body.id || !req.body.pin || !req.body.amount) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields (id, pin, or amount)",
    });
  }

  const { id, pin, amount } = req.body;

  // 2. Validate amount is a positive number
  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      status: "error",
      message: "Amount must be a positive number",
    });
  }

  try {
    // 3. Attempt to withdraw money
    const result = await accountService.depositMoney(id, pin, Number(amount));
    // 4. Handle service-level errors (if your service returns error objects)
    if (result?.error) {
      const statusCode = result.error.includes("not found") ? 404 : 400;
      return res.status(statusCode).json({
        status: "error",
        message: result.error,
      });
    }

    // 5. Return successful response
    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    // 6. Handle unexpected errors
    console.error("Deposit error:", err);

    // Handle known error messages
    if (
      err.message.includes("Amount should be more than 0") ||
      err.message.includes("Account not found")
    ) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error while processing withdrawal",
    });
  }
};

module.exports = { getAccountByPin, withdrawMoney, depositMoney };
