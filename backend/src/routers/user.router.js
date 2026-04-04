import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

export default userRouter;