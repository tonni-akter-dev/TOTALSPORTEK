import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'ukashaatif123@gmail.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('your_admin_password', 10);
      
      await User.create({
        email: 'ukashaatif123@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

createAdminUser(); 