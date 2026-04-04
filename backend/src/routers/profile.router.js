import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createProfile, getMyProfile } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.post("/", authenticateToken, createProfile);
profileRouter.get("/me", authenticateToken, getMyProfile);

export default profileRouter;