import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import userRoutes from './routes/users.js';
import reportRoutes from './routes/reports.js';
//import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:5173']
}));
app.use(express.json());


// Routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});