import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createRelation, getMyRelations } from "../controllers/relation.controller.js";

const relationRouter = express.Router();

relationRouter.post("/", authenticateToken, createRelation);
relationRouter.get("/me", authenticateToken, getMyRelations);

export default relationRouter;