import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio_db";

  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to database at ${uri}: ${error.message}`);
    console.warn(`[MongoDB Warning] Operating in fallback mode with mock database store.`);
    isConnected = false;
    return false;
  }
};

export const getDbStatus = () => isConnected;
