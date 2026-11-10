const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
    errors: ["Rate limit exceeded"],
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "BMDU Employee Management API is running",
  });
});

app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    errors: ["The requested resource does not exist"],
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
