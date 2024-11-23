import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function run(prompt) {
try {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });
  
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
} 
catch(error) {
  return "⚠️ Notice: This application requires a valid API key to function. To use it: \n\n" +
       "1. Fork the project from GitHub.\n" +
       "2. Obtain your own Google API key.\n" +
       "3. Add the key to a `.env` file in the root directory with the name `VITE_GOOGLE_API_KEY`.\n\n" +
       "Ensure the project is built and deployed correctly with your configuration. \n\n" +
       "Thank you for your interest and support! 😊";
}
}

export default run;
