import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createExpertProfile,
  getMyExpertProfile,
} from "../controllers/expert-profile.controller.js";
import { createExpertProfileSchema } from "../schemas/expert-profile.schema.js";


const expertProfileRouter = express.Router();

expertProfileRouter.post("/", authenticateToken, validate(createExpertProfileSchema), createExpertProfile);
expertProfileRouter.get("/me", authenticateToken, getMyExpertProfile);

export default expertProfileRouter;