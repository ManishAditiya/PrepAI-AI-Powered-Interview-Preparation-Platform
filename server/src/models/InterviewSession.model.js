const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role:       { type: String, required: true },
  resumeUrl:  { type: String },
  questions:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  score:      { type: Number, default: 0 },
  status:     { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('InterviewSession', sessionSchema);