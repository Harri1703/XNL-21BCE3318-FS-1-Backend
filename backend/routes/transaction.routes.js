const express = require("express");
const { Transaction, Account } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get Transaction History
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { userId: req.user.id } });
    const accountIds = accounts.map(acc => acc.id);

    const transactions = await Transaction.findAll({ where: { accountId: accountIds } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
