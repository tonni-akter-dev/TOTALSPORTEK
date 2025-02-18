import mongoose from '../integrations/mongodb/client.js';
import { Team } from './Team.js';
import { League } from './League.js';
import bcrypt from 'bcryptjs';

// Event Schema
const eventSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  category: String,
  league: String,
  title: String,
  eventUrl: String,
  redirectUrls: [String],
  startDate: Date,
  endDate: Date,
  sticky: Boolean,
  channels: String,
  embeds: String,
  pageTitle: String,
  metaDescription: String,
  metaKeywords: String,
  pageContent: String,
  viewCount: { type: Number, default: 0 },
  isLive: { type: Boolean, default: false }
});

const Event = mongoose.model('Event', eventSchema);

// Channel Schema
const channelSchema = new mongoose.Schema({
  name: String,
  seo_name: String,
  style: String,
  url: String,
  canonical: String,
  redirect_urls: [String],
  in_submenu: String,
  image: String,
  enabled: String,
  order: Number,
  embed_code: String,
  page_title: String,
  meta_description: String,
  meta_keywords: String,
  page_content: String,
});

const Channel = mongoose.model('Channel', channelSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: String,
  seo_name: String,
  category_url: String,
  redirect_urls: [String],
  category_image: String,
  show_on_menu: String,
  show_on_other_menus: String,
  order: Number,
  page_title: String,
  meta_description: String,
  meta_keywords: String,
  page_content: String,
  category_duration: String,
});

const Category = mongoose.model('Category', categorySchema);

// User Schema
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  methods: {
    comparePassword(candidatePassword) {
      return bcrypt.compare(candidatePassword, this.password);
    },
    updateLastLogin() {
      this.lastLogin = new Date();
      return this.save();
    }
  }
});

const User = mongoose.model('User', userSchema);

export { Team, League, Event, Channel, Category, User };

// module.exports = {
//   Team,
//   Event,
//   League,
//   Channel,
//   Category,
// }; 