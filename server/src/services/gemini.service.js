const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
});

/*
==================================
QUESTION GENERATION
==================================
*/

exports.generateQuestions = async ({
  resumeText,
  skills,
  targetRole
}) => {

  const prompt = `
You are a senior technical interviewer.

Target Role: ${targetRole}

Detected Skills:
${skills.join(', ')}

Resume:
${resumeText}

Generate exactly 10 interview questions.

Return ONLY JSON array.
[
 {
   "text":"question",
   "category":"Frontend",
   "difficulty":"medium",
   "idealAnswer":"answer"
 }
]
`;

  const result =
    await model.generateContent(prompt);

  const raw =
    result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    const match =
      raw.match(/\[[\s\S]*\]/);

    if (match)
      return JSON.parse(match[0]);

    throw new Error(
      'Failed to parse questions'
    );
  }
};

/*
==================================
ANSWER EVALUATION
==================================
*/

exports.evaluateAnswer = async (
  question,
  answer
) => {

  const prompt = `
You are a senior interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate based on:

1. Technical Accuracy
2. Clarity
3. Completeness
4. Communication

Return ONLY JSON.

{
 "score":85,
 "feedback":"Good answer",
 "strengths":["Point 1"],
 "improvements":["Point 2"]
}
`;

  const result =
    await model.generateContent(prompt);

  const raw =
    result.response.text();

  try {
    return JSON.parse(raw);
  } catch {

    const match =
      raw.match(/\{[\s\S]*\}/);

    if (match)
      return JSON.parse(match[0]);

    throw new Error(
      'Failed to parse evaluation'
    );
  }
};