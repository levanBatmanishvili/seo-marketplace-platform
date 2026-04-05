import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createNeed, getMyNeeds } from "../controllers/need.controller.js";
import { createNeedSchema } from "../schemas/need.schema.js";


const needRouter = express.Router();

needRouter.post("/", authenticateToken, validate(createNeedSchema), createNeed);
needRouter.get("/me", authenticateToken, getMyNeeds);

export default needRouter;