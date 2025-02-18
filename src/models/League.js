import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  activeTeams: { type: Number, default: 0 }
}, { timestamps: true });

export const League = mongoose.model('League', leagueSchema); 