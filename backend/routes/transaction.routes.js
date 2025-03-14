const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { Account, Transaction } = require("../models");

const router = express.Router();

router.post("/deposit", authenticate, async (req, res) => {
  const { amount } = req.body;
  const account = await Account.findOne({ where: { userId: req.user.id } });

  account.balance += amount;
  await account.save();

  await Transaction.create({ accountId: account.id, type: "deposit", amount });
  res.json(account);
});

module.exports = router;
