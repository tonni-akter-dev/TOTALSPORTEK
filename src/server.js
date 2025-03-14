import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import teamRoutes from './routes/team.js';
import categoryRoutes from './routes/category.js';
import leagueRoutes from './routes/leagues.js';
import bcrypt from 'bcryptjs';
import { User } from './models/index.js';
import dotenv from 'dotenv';
import matchRoutes from './routes/matches.js';
import channelRoutes from './routes/channel.js';
import streamRoutes from './routes/streams.js';
import eventRoutes from './routes/events.js'; // Import the new events route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
// app.use(cors());
app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin: "http://localhost:8080",
  // origin: "http://135.181.63.71:8081",
  credentials: true, // Allow cookies and authentication headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', teamRoutes);
app.use('/api', categoryRoutes);
app.use('/api', leagueRoutes);
app.use('/api', channelRoutes);
app.use('/api', matchRoutes);
app.use('/api', eventRoutes);
app.use('/api/streams', streamRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app;

// Temporary function to update admin credentials
const updateAdminCredentials = async () => {
  try {
    const hashedPassword = await bcrypt.hash("ukasha68122", 10);
    await User.findOneAndUpdate(
      { role: "admin" }, // Update any admin user
      {
        email: "ukashaatif123@gmail.com",
        password: hashedPassword
      }
    );
    console.log("Admin credentials updated successfully");
  } catch (error) {
    console.error("Error updating admin credentials:", error);
  }
};

updateAdminCredentials();