import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://mayur121900:121912@cluster0.npmry.mongodb.net/food-del?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the server if DB connection fails
  }
};
