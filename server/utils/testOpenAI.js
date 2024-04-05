// THIS IS A SAMPLE CODE OF USING OPENAI API
// YOU CAN USE THIS FILE TO TEST YOUR OPENAI API KEY
 
// USE 'node testOpenAI.js' TO RUN THIS FILE

const OpenAI = require("openai");
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
// console.log(apiKey);

const openai = new OpenAI({ apiKey : apiKey });

async function main(note) {
  let length = parseInt(note.content.length/10);
  if(length<=10){
    length=10;
  }
  // console.log(length);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `Please summarize the following blog : ${note.content}.
    Make sure it is less than ${length} words.` }],
    model: "gpt-3.5-turbo",
  });

  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

module.exports=main;