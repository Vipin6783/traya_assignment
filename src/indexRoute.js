import express from "express";
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/users/user.route";


const indexRouter = express.Router();

indexRouter.get("/", function (req, res, next) {
  res.status(200).json({ message: "WELCOME TO TRAYA" });
});

indexRouter.use(authRouter);
indexRouter.use(userRouter);

module.exports = indexRouter;
