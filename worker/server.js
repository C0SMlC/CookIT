const express = require("express");
const dotenv = require("dotenv");
// const connectDB = require("./config/db");

dotenv.config({ path: "./config.env" });

const app = express();

// connectDB();

require("./cron/emailCron");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
