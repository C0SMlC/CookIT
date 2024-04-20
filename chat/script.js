const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config(path.join(__dirname, ".env"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function run() {
  const prompt = "Write a story about a magic backpack.";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
