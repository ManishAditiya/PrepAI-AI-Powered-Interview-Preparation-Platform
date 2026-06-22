const {
 generateContent
} = require("./gemini.service");

const {
 answerEvaluationPrompt
} = require("./prompt.service");

exports.evaluateAnswer =
 async(question, answer)=>{

  const prompt =
   answerEvaluationPrompt(
     question,
     answer
   );

  const result =
    await generateContent(prompt);

  return JSON.parse(result);
 };