import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import profileRouter from "./profile.router.js";
import expertProfileRouter from "./expert-profile.router.js";
import needRouter from "./need.router.js";
import relationRouter from "./relation.router.js";
import messageRouter from "./message.router.js";

export default function registerRoutes(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/profiles", profileRouter);
  app.use("/api/expert-profiles", expertProfileRouter);
  app.use("/api/needs", needRouter);
  app.use("/api/relations", relationRouter);
  app.use("/api/messages", messageRouter);
}