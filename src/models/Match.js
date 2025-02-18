import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  match: { type: String, required: true },
  link: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedBy: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Match = mongoose.model('Match', matchSchema); 