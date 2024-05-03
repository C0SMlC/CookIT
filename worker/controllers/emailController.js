const cron = require("node-cron");
const sendEmail = require("../utils/sendEmail");
const client = require("../config/client");

exports.sendMealReminder = async () => {
  await client.connect();
  const database = client.db("test");
  const usersCollection = database.collection("users");
  const mealsCollection = database.collection("meals");

  const users = await usersCollection.find().toArray();

  for (const user of users) {
    const meals = await mealsCollection.find({ userId: user.uid }).toArray();

    for (const meal of meals) {
      const mailOptions = {
        email: user.email,
        subject: "Meal Reminder",
        mealType: meal.type,
        mealLink: "http://127.0.0.1:3000/app/recipe/" + meal.recipeId,
      };

      await sendEmail(mailOptions);
    }
  }

  await client.close();
};
