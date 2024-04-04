// THIS IS A SAMPLE CODE OF USING OPENAI API
// YOU CAN USE THIS FILE TO TEST YOUR OPENAI API KEY
 
// USE 'node testOpenAI.js' TO RUN THIS FILE

const OpenAI = require("openai");
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
// console.log(apiKey);

const openai = new OpenAI({ apiKey : apiKey });

async function main(note) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Summarize the following text with title as : ${note.title}, in easy english.Please generate HTML Tags having bullet points as well as appropriate headings. Content is :  ${note.content}, please limit the summary to 300 words` }],
    model: "gpt-3.5-turbo",
  });

  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

module.exports=main;