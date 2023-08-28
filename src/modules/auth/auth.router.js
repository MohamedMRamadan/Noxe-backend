import { Router } from "express";
import * as authController from "./auth.controller.js";
const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/verify", authController.verify);
authRouter.post("/login", authController.signin);
authRouter.post("/forgotPassword", authController.forgotPassword);
authRouter.post("/checkCode", authController.CheckPasswordCode);
authRouter.put("/updatePassword", authController.updatePassword);

export default authRouter;
