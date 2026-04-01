import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import "./models/user.model.js";
import authRouter from "./routers/auth.router.js";


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

// Test route
app.use("/api/auth", authRouter);
app.get("/api", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;