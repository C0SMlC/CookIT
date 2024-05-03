import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = 'AIzaSyCv4S8HnSs8eO--f9L_Nm9DKXhzF5N5B5Q';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export function generateAIResponse(userInput) {
  async function run() {
    const prompt = `The prompt given must be related to food only if its not related to food dont answer and 
                   politely tell to ask about food, now if someone asks you about the food refer the spooncular database to fetch
                   info about the food item remeber the rules, and the heres is the prompt, and introduce yourself as "CookIt ChatBot": ${userInput}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const stringWithNewLines = text.replace(/\*\*/g, '\n');
    const cleanedString = stringWithNewLines.replace(/\* /g, '\n• ');
    return cleanedString;
  }

  return run();
}

export async function sendMessage() {
  let userInput = document.getElementById('chat-input').value;

  if (userInput) {
    document.getElementById('chat-input').value = '';
    let chatLogs = document.getElementById('chat-logs');
    let userDiv = document.createElement('div');
    userDiv.classList.add('chat-self');
    userDiv.textContent = userInput;
    chatLogs.appendChild(userDiv);
    chatLogs.scrollTop = chatLogs.scrollHeight;
    const response = await generateAIResponse(userInput);
    setTimeout(function () {
      let chatbotDiv = document.createElement('div');
      chatbotDiv.classList.add('chat-bot');
      chatbotDiv.innerHTML = response;
      chatLogs.appendChild(chatbotDiv);
      chatLogs.scrollTop = chatLogs.scrollHeight;
    }, 100);
  }
}
