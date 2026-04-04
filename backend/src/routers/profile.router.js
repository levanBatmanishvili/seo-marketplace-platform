import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfile, getMyProfile } from "../controllers/profile.controller.js";
import { createProfileSchema } from "../schemas/profile.schema.js";

const profileRouter = express.Router();

profileRouter.post(
    "/", 
authenticateToken, 
validate(createProfileSchema), 
createProfile);
profileRouter.get("/me", authenticateToken, getMyProfile);

export default profileRouter;