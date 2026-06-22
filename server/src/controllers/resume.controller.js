const InterviewSession = require('../models/InterviewSession.model');
const Question = require('../models/Question.model');
const { extractTextFromUrl, parseResumeContext } = require('../services/resumeParser.service');
const { generateQuestions } = require('../services/gemini.service');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { targetRole } = req.body;
    const fileUrl = req.file.location;  // S3 public URL from multer-s3

    // 1. Parse PDF
    const rawText = await extractTextFromUrl(fileUrl);
    const { skills, resumeText } = parseResumeContext(rawText);

    // 2. Generate questions via Gemini
    const questionsData = await generateQuestions({ resumeText, skills, targetRole });

    // 3. Create session
    const session = await InterviewSession.create({
      user:      req.user.id,
      role:      targetRole,
      resumeUrl: fileUrl,
    });

    // 4. Save questions
    const questions = await Question.insertMany(
      questionsData.map(q => ({ ...q, session: session._id }))
    );

    session.questions = questions.map(q => q._id);
    await session.save();

    res.status(201).json({
      sessionId: session._id,
      questions: questions.map(q => ({ id: q._id, text: q.text, category: q.category, difficulty: q.difficulty })),
    });
  } catch (err) { next(err); }
};