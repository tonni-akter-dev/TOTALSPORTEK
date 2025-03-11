import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: false },
  description: String,
  category: { type: String, required: true },
  activeTeams: { type: Number, default: 0 },
  url: { type: String },
  redirect_urls: { type: [String] },
  image: { type: String },
  show_on_menu: { type: String },
  show_on_other_menus: { type: String },
  order: { type: Number },
  page_title: { type: String },
  h1_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  page_content: { type: String }
}, { timestamps: true });

export const League = mongoose.model('League', leagueSchema);
