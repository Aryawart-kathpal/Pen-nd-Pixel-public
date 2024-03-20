// THIS IS A SAMPLE CODE OF USING OPENAI API
// YOU CAN USE THIS FILE TO TEST YOUR OPENAI API KEY
 
// USE 'node testOpenAI.js' TO RUN THIS FILE

const OpenAI = require("openai");
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);

const openai = new OpenAI({ apiKey : apiKey });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "How to use Open AI Api In my project in NodeJS?" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();