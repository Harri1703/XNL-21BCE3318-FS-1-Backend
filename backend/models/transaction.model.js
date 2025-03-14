const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  type: { type: DataTypes.ENUM("deposit", "withdraw", "transfer"), allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Transaction;
