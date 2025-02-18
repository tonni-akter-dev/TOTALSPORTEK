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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'], // Allow both ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', teamRoutes);
app.use('/api', categoryRoutes);
app.use('/api', leagueRoutes);
app.use('/api', matchRoutes);

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