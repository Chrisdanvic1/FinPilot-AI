import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI || DB_URI === null) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

const connectToDatabse = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (err) {
    console.error("Error connecting to database", err);
    process.exit(1);
  }
};

export default connectToDatabse;
