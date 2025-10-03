import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config.js"
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from "uploads" directory
app.use("/uploads", express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

// Database Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
