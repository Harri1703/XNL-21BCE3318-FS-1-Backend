const express = require("express");
const { Account, Transaction } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Get Account Balance
router.post("/getbalance", authMiddleware, async (req, res) => {
  try {
    const { accountId } = req.body;
    const account = await Account.findOne({ where: { id: accountId, userId: req.user.id } });
    if (!account) return res.status(404).json({ error: "Account not found" });

    res.json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deposit Amount
router.post("/deposit", authMiddleware, async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    const account = await Account.findOne({ where: { id: accountId, userId: req.user.id } });
    if (!account) return res.status(404).json({ error: "Account not found" });

    account.balance += amount;
    await account.save();

    await Transaction.create({ accountId, type: "deposit", amount });

    res.json({ message: "Deposit successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Withdraw Amount
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    const account = await Account.findOne({ where: { id: accountId, userId: req.user.id } });

    if (!account || account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    account.balance -= amount;
    await account.save();

    await Transaction.create({ accountId, type: "withdraw", amount });

    res.json({ message: "Withdrawal successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer Amount
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const fromAccount = await Account.findOne({ where: { id: fromAccountId, userId: req.user.id } });
    const toAccount = await Account.findOne({ where: { id: toAccountId } });

    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      return res.status(400).json({ error: "Transfer failed" });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();

    await Transaction.create({ accountId: fromAccountId, type: "transfer_out", amount });
    await Transaction.create({ accountId: toAccountId, type: "transfer_in", amount });

    res.json({ message: "Transfer successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
