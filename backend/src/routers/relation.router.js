import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createRelation, getMyRelations } from "../controllers/relation.controller.js";
import { createRelationSchema } from "../schemas/relation.schema.js";


const relationRouter = express.Router();

relationRouter.post("/", authenticateToken, validate(createRelationSchema), createRelation);
relationRouter.get("/me", authenticateToken, getMyRelations);

export default relationRouter;