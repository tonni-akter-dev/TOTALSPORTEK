import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seo_name: { type: String },
  team_url: { type: String },
  redirect_urls: { type: String },
  team_image: { type: String },
  show_on_menu: { type: String, default: "Yes" },
  show_on_other_menus: { type: String, default: "Yes" },
  order: { type: Number, default: 0 },
  page_title: { type: String },
  meta_description: { type: String },
  meta_keywords: { type: String },
  page_content: { type: String },
  logo: { type: String },
  league: { type: String, required: true },
}, { timestamps: true });


export const Team = mongoose.model('Team', teamSchema);
