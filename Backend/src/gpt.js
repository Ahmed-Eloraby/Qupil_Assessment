require("dotenv").config();
const { OpenAI } = require("openai");

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: API_KEY });

async function consultGPT(tutors, prompt) {
  let text = `Help me to find the best 3 tutors that satisfy specific requirements be aware of the gender, grades and subjects, bare in mind that weekend is on Friday and Saturday instead of Saturday and Sunday, I will give you a list of tutors from the data base and the requirements, just return the top 3 tutors id, name , score of relevance from 0 to 10, and a concise reason you picked them in the form [{id, name, score, reason}] without any other text. tutors: ${tutors}, requirements: ${prompt}`;
  console.log(text);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

module.exports = { consultGPT };
