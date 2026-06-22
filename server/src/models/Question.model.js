const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  session:      { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSession' },
  text:         { type: String, required: true },
  category:     { type: String },   // e.g. "DSA", "System Design", "Behavioral"
  difficulty:   { type: String, enum: ['easy', 'medium', 'hard'] },
  idealAnswer:  { type: String },
  userAnswer:   { type: String },
  aiFeedback:   { type: String },
  score:        { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);