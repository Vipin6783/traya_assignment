import express from "express";
import UserController from "./user.controller";
import authMiddleware from "../../middlewares/authMiddleware";

const userRouter = express.Router();
userRouter.post("/order", authMiddleware, UserController.createOrder);

userRouter.post(
  "/purchase/order",
  authMiddleware,
  UserController.purchaseOrder
);

userRouter.post("/feedback", authMiddleware, UserController.editOrSaveFeedback);

userRouter.get(
  "/feedback/:orderId",
  authMiddleware,
  UserController.getUserFeedbackDetail
);

export default userRouter;
