const sequelize = require("../config/database");
const User = require("./user.model");
const Account = require("./account.model");
const Transaction = require("./transaction.model");

User.hasOne(Account, { foreignKey: "userId" });
Account.belongsTo(User, { foreignKey: "userId" });

Account.hasMany(Transaction, { foreignKey: "accountId" });
Transaction.belongsTo(Account, { foreignKey: "accountId" });

module.exports = { sequelize, User, Account, Transaction };
