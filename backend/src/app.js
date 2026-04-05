import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import "./models/index.js";
import registerRoutes from "./routers/index.js";

const app = express();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database error:", err));

  sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.error("Sync error:", error));

  // Routes
  registerRoutes(app);

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;