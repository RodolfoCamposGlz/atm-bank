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
    return res.status(500).json({
      status: "error",
      message: "Internal server error while fetching account",
    });
  }
};

module.exports = { getAccountByPin };
