const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL, // frontend URL
  credentials: true                // allow cookies/auth headers if needed
}));

// Routes
app.use("/api/tasks", require("./routes/tasksRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Database connection
connectDB();

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
