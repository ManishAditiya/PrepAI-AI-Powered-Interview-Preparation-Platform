const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuestions = async ({ resumeText, skills, targetRole }) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
You are a senior technical interviewer. Based on the following resume context and target role, generate exactly 10 interview questions.

Target Role: ${targetRole}
Detected Skills: ${skills.join(', ')}
Resume Summary: ${resumeText}

Return ONLY a valid JSON array with this exact structure, no markdown, no extra text:
[
  {
    "text": "question text",
    "category": "DSA | System Design | Behavioral | Frontend | Backend | Database",
    "difficulty": "easy | medium | hard",
    "idealAnswer": "brief ideal answer"
  }
]
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse Gemini response as JSON');
  }
};