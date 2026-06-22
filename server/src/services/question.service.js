const {
 generateContent
} = require("./gemini.service");

const {
 questionGenerationPrompt
} = require("./prompt.service");

exports.generateQuestions =
 async(
  role,
  skills,
  resumeText
 )=>{

  const prompt =
    questionGenerationPrompt(
      role,
      skills,
      resumeText
    );

  const response =
    await generateContent(prompt);

  return JSON.parse(response);
 };