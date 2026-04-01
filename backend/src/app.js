import express from "express";
import cors from "cors";

const app = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;