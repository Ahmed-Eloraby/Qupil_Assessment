const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
require("dotenv").config();
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.GOOGLE_AUTH;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const consultAI = async (prompt) => {
  const sentence = `Given a sentence about timing of multiple sessions, suggest a suitable day for each session , time in 24h format, length of the session in minutes multiple of 30 , subject and grade. return it as a List of JSON objects like: [{ "day": "Sunday", "time": "XX:XX", "length": XX, "subject": "XXXX","grade": X}]. Each session starts at HH:00 or HH:30 and only lasts for 30 min. Make sure that all session do not clash with each other. if any data is missing, assign it with empty string if text or 0 if number. Sentence: ${prompt}`;
  const result = await client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: sentence,
    },
  });
  return result[0].candidates[0].output;
};

module.exports = { consultAI };
