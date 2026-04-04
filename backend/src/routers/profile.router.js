import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfile, getMyProfile, updateMyProfile  } from "../controllers/profile.controller.js";
import { createProfileSchema, updateProfileSchema  } from "../schemas/profile.schema.js";

const profileRouter = express.Router();

profileRouter.post("/", authenticateToken, validate(createProfileSchema), createProfile);
profileRouter.get("/me", authenticateToken, getMyProfile);
profileRouter.patch("/me", authenticateToken, validate(updateProfileSchema), updateMyProfile);

export default profileRouter;