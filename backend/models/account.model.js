const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, // FK should always be required
    },
  },
  {
    tableName: "accounts",
    timestamps: true, // Adds createdAt & updatedAt automatically
    indexes: [{ unique: true, fields: ["accountNumber"] }], // Index for fast lookup
  }
);

module.exports = Account;
