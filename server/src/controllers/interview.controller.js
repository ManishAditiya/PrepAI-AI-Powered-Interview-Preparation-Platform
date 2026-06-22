const Question =
require('../models/Question.model');

const {
 evaluateAnswer
} = require('../services/gemini.service');

exports.submitAnswer =
async (req,res,next)=>{

 try{

  const {
   questionId,
   answer
  } = req.body;

  const question =
   await Question.findById(
    questionId
   );

  if(!question){
   return res.status(404).json({
    message:'Question not found'
   });
  }

  const evaluation =
   await evaluateAnswer(
    question.text,
    answer
   );

  question.userAnswer =
   answer;

  question.score =
   evaluation.score;

  question.aiFeedback =
   evaluation.feedback;

  question.strengths =
   evaluation.strengths;

  question.improvements =
   evaluation.improvements;

  await question.save();

  res.json(evaluation);

 }catch(err){
  next(err);
 }
};