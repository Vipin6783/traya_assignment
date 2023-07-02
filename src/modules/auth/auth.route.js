import express from "express";
import AuthController from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/loginOrSignup", AuthController.loginOrSignup);

export default authRouter;
