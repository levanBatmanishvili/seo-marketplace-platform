import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createNeed, getMyNeeds } from "../controllers/need.controller.js";

const needRouter = express.Router();

needRouter.post("/", authenticateToken, createNeed);
needRouter.get("/me", authenticateToken, getMyNeeds);

export default needRouter;