const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database"); // Import Sequelize instance

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ alter: true }) // Ensures tables exist and updates structure if needed
  .then(() => {
    console.log("✅ Database synced successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ Database sync error:", err));
