const sequelize = require("../config/database");
const User = require("./user.model");
const Account = require("./account.model");
const Transaction = require("./transaction.model");

// Define User - Account Relationship
User.hasMany(Account, { foreignKey: "userId", onDelete: "CASCADE" });
Account.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// Define Account - Transaction Relationship
Account.hasMany(Transaction, { foreignKey: "accountNumber", sourceKey: "accountNumber", onDelete: "CASCADE" });
Transaction.belongsTo(Account, { foreignKey: "accountNumber", targetKey: "accountNumber" });

module.exports = { sequelize, User, Account, Transaction };
