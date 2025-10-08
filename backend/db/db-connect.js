import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/task-manager-fullstack");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;