exports.questionGenerationPrompt = (
  role,
  skills,
  resumeText
) => `
You are a senior technical interviewer.

Target Role:
${role}

Skills:
${skills.join(", ")}

Resume:
${resumeText}

Generate exactly 10 interview questions.

Return JSON only.

[
 {
   "text":"question",
   "category":"Frontend",
   "difficulty":"medium",
   "idealAnswer":"ideal answer"
 }
]
`;

exports.answerEvaluationPrompt = (
  question,
  answer
) => `
You are a senior interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate and return JSON only.

{
 "score":85,
 "feedback":"Good answer",
 "strengths":[
   "Clear explanation"
 ],
 "improvements":[
   "Add optimization discussion"
 ]
}
`;