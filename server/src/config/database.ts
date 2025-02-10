import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL || '');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
