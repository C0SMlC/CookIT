const cron = require("node-cron");
const { sendMealReminder } = require("../controllers/emailController");

cron.schedule("* * * * *", async () => {
  console.log("Running email cron job");
  await sendMealReminder();
});
