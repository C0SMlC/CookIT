const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD
    );

    mongoose.connect(db).then(() => console.log("Connection Successfull"));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
