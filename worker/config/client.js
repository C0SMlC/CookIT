const { MongoClient } = require("mongodb");

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const client = new MongoClient(db);

module.exports = client;
