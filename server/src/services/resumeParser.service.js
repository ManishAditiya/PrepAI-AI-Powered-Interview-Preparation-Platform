const pdf = require('pdf-parse');
const axios = require('axios');

exports.extractTextFromUrl = async (fileUrl) => {
  const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data);
  const data = await pdf(buffer);
  return data.text;
};

exports.parseResumeContext = (rawText) => {
  // Simple heuristic extraction — upgrade with NLP later
  const skills = [];
  const skillKeywords = ['JavaScript', 'React', 'Node', 'Python', 'Java', 'MongoDB',
    'SQL', 'Docker', 'AWS', 'TypeScript', 'Express', 'Redis'];

  skillKeywords.forEach(skill => {
    if (rawText.toLowerCase().includes(skill.toLowerCase())) skills.push(skill);
  });

  return {
    rawText: rawText.slice(0, 3000),  // Trim for Gemini context window
    skills,
  };
};