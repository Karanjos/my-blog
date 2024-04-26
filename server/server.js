import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

// Initialize express app
const app = express();

// Middleware
dotenv.config({ path: "./config/config.env" });
app.use(
  cors({
    origin: process.env.VITE_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use("/api", routes);

// Connect to MongoDB
mongoose
  .connect(process.env.VITE_MONGO_URI, {
    dbName: process.env.VITE_DB_NAME,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error(err);
  });

// Start server on port
const PORT = process.env.VITE_PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
