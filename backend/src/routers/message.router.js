import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/", authenticateToken, sendMessage);
messageRouter.get("/:relationId", authenticateToken, getMessages);

export default messageRouter;