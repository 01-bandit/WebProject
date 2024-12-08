import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    const uri = 'mongodb+srv://admin:admin123@cluster0.qxcrv.mongodb.net/careerconnect?retryWrites=true&w=majority&appName=Cluster0';
    
    const conn = await mongoose.connect(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,});
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize database with a test collection if it doesn't exist
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('Initializing database with required collections...');
      // Create initial collections
      await db.createCollection('users');
      await db.createCollection('jobs');
      await db.createCollection('reports');
      console.log('Database initialized successfully');
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;