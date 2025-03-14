const express = require("express");
const { Account, Transaction } = require("../models");
const authMiddleware = require("../middlewares/authMiddleware");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Generate a unique account number
const generateAccountNumber = () => uuidv4(); // Generates a unique identifier

// Create Account (No body needed)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const account = await Account.create({
      userId: req.user.id,
      accountNumber: generateAccountNumber(),
      balance: 0,
    });

    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch All Accounts of Logged-in User
router.get("/fetch", authMiddleware, async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { userId: req.user.id } });

    if (!accounts.length) {
      return res.status(404).json({ message: "No accounts found" });
    }

    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Account Balance
router.post("/getbalance", authMiddleware, async (req, res) => {
    try {
      const { accountNumber } = req.body;
      const account = await Account.findOne({ where: { accountNumber, userId: req.user.id } });
  
      if (!account) return res.status(404).json({ error: "Account not found" });
  
      res.json({ balance: account.balance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Deposit Amount
router.post("/deposit", authMiddleware, async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    const account = await Account.findOne({ where: { accountNumber, userId: req.user.id } });

    if (!account) return res.status(404).json({ error: "Account not found" });

    account.balance += amount;
    await account.save();

    await Transaction.create({ accountNumber, type: "deposit", amount });

    res.json({ message: "Deposit successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Withdraw Amount
router.post("/withdraw", authMiddleware, async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    const account = await Account.findOne({ where: { accountNumber, userId: req.user.id } });

    if (!account || account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    account.balance -= amount;
    await account.save();

    await Transaction.create({ accountNumber, type: "withdraw", amount });

    res.json({ message: "Withdrawal successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer Amount
router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const { fromAccountNumber, toAccountNumber, amount } = req.body;
    const fromAccount = await Account.findOne({ where: { accountNumber: fromAccountNumber, userId: req.user.id } });
    const toAccount = await Account.findOne({ where: { accountNumber: toAccountNumber } });

    if (!fromAccount || !toAccount || fromAccount.balance < amount) {
      return res.status(400).json({ error: "Transfer failed" });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();

    await Transaction.create({ accountNumber: fromAccountNumber, type: "transfer_out", amount });
    await Transaction.create({ accountNumber: toAccountNumber, type: "transfer_in", amount });

    res.json({ message: "Transfer successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
