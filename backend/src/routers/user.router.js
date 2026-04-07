import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { getExperts } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});

userRouter.get("/experts", authenticateToken, getExperts);

export default userRouter;