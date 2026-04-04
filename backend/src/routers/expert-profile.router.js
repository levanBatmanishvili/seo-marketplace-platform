import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
  createExpertProfile,
  getMyExpertProfile,
} from "../controllers/expert-profile.controller.js";

const expertProfileRouter = express.Router();

expertProfileRouter.post("/", authenticateToken, createExpertProfile);
expertProfileRouter.get("/me", authenticateToken, getMyExpertProfile);

export default expertProfileRouter;