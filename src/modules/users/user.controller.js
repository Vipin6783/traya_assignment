import UserService from "./user.service";

class UserController {
  createOrder = async (req, res, next) => {
    try {
      const {
        body: { title, description, amount },
      } = req;
      const result = await UserService.createOrder({
        title,
        description,
        amount,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  purchaseOrder = async (req, res, next) => {
    try {
      const {
        body: { orderId },
        userMongoId,
      } = req;
      const result = await UserService.purchaseOrder({ orderId, userMongoId });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  editOrSaveFeedback = async (req, res, next) => {
    try {
      const {
        body: { rating, feedback, orderId },
        userMongoId,
      } = req;
      const result = await UserService.editOrSaveFeedback({
        orderId,
        rating,
        feedback,
        userMongoId,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getUserFeedbackDetail = async (req, res, next) => {
    try {
      const {
        params: { orderId },
        userMongoId,
      } = req;
      const result = await UserService.getUserFeedbackDetail(
        orderId,
        userMongoId
      );
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
