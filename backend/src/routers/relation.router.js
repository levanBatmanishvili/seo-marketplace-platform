import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
    createRelation,
    getMyRelations,
    acceptRelation,
    rejectRelation,
  } from "../controllers/relation.controller.js";
import { createRelationSchema } from "../schemas/relation.schema.js";


const relationRouter = express.Router();

relationRouter.post("/", authenticateToken, validate(createRelationSchema), createRelation);
relationRouter.get("/me", authenticateToken, getMyRelations);
relationRouter.patch("/:id/accept", authenticateToken, acceptRelation);
relationRouter.patch("/:id/reject", authenticateToken, rejectRelation);

export default relationRouter;