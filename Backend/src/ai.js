const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
require("dotenv").config();
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.GOOGLE_AUTH;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const consultAI = async (prompt) => {
  const sentence = `Given a sentence about timing of multiple sessions, determine subject and grade of the session, suggest a suitable day for each session, hour and minute  , length of the session in minutes as a multiple of 30. return it as a JSON object like: { "slots": [ "day": "Sunday", "hour": XX, "minute":xx // 30 or 0, "length": XX], "subject": "XXXX","grade": X} where slots can have more than one entry.Make sure that all session do not clash with each other. if any data is missing, assign it with empty string if text or 0 if number. Sentence: ${prompt}`;
  const result = await client.generateText({
    model: MODEL_NAME,
    prompt: {
      text: sentence,
    },
  });
  return result[0].candidates[0].output;
};

module.exports = { consultAI };
