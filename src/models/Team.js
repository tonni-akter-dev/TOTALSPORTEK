import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  league: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
  ranking: { type: Number },
  stats: String
}, { timestamps: true });

export const Team = mongoose.model('Team', teamSchema); 