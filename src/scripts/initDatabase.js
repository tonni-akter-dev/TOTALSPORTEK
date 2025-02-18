import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/index.js';

dotenv.config();

const users = [
  {
    email: 'muneebmuzammil123@gmail.com',
    password: 'muneeb1122',
    role: 'user'
  },
  {
    email: 'ukashaatif123@gmail.com',
    password: 'ukasha68122',
    role: 'admin'
  }
];

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create new users
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await User.create({
        ...userData,
        password: hashedPassword
      });
      console.log(`Created user: ${userData.email}`);
    }

    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the initialization
initializeDatabase(); 