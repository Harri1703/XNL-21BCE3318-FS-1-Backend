require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/accounts", require("./routes/account.routes"));
app.use("/transactions", require("./routes/transaction.routes"));
app.use("/users", require("./routes/user.routes"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
  });
});
