const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { Account } = require("../models");

const router = express.Router();

router.post("/create", authenticate, async (req, res) => {
  const account = await Account.create({ userId: req.user.id });
  res.json(account);
});

router.get("/fetch", authenticate, async (req, res) => {
  const account = await Account.findOne({ where: { userId: req.user.id } });
  res.json(account);
});

module.exports = router;
