import mongoose from "mongoose";
import { ENV } from "../config/env.js";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGODB CONNECTED", connect.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB", error);
    process.exit(1); // 1 is fail, 0 is success
  }
};