import OrderDao from "../../daos/orderDao";

const ObjectID = require("mongodb").ObjectID;

class UserService {
  createOrder = async ({ title, description, amount }) => {
    const data = {
      title: title || "",
      description: description || "",
      amount: amount || 0,
    };
    const orderRef = await OrderDao.createOrder(data);

    return {
      orderId: orderRef._id.toString(),
      message: "Order created successfully",
    };
  };

  purchaseOrder = async ({ orderId, userMongoId }) => {
    const orderRef = await OrderDao.findByOrderId(orderId);
    if (!orderRef) {
      throw new Error("Invalid order Id");
    }

    const data = {
      $push: {
        ordered_by: {
          user_id: new ObjectID(userMongoId),
        },
      },
    };
    await OrderDao.updateDataByOrderId(data, orderId);

    return {
      message: "Order created successfully",
    };
  };

  editOrSaveFeedback = async ({ orderId, rating, feedback, userMongoId }) => {
    const filter = {
      _id: new ObjectID(orderId),
      ordered_by: {
        $elemMatch: { user_id: new ObjectID(userMongoId) },
      },
    };
    const data = {
      $set: {
        "ordered_by.$.user_id": new ObjectID(userMongoId),
        "ordered_by.$.feedback": feedback || "",
        "ordered_by.$.rating_count": rating || "",
      },
    };

    const userRef = await OrderDao.updateData(filter, data);

    return { userId: userRef.id, message: "Feedback submitted successfully" };
  };

  getUserFeedbackDetail = async (orderId, userMongoId) => {
    const orderRef = await OrderDao.findByOrderId(orderId);
    if (!orderRef) {
      throw new Error("Invalid order Id");
    }
    const orderedBy = orderRef.ordered_by || [];

    let feedbackDetail = {};
    if (orderedBy.length > 0) {
      for (let order of orderedBy) {
        if (order.user_id.toString() == userMongoId && (order.rating_count || order.feedback )) {
          feedbackDetail = {
            orderId: orderRef._id.toString(),
            ratingCount: order.rating_count || "",
            feedback: order.feedback || "",
            isFeedbackExist: true,
          };
          break;
        }
      }
    }

    if (Object.keys(feedbackDetail).length < 1) {
      feedbackDetail = {
        orderId: orderRef._id.toString(),
        ratingCount: "",
        feedback: "",
        isFeedbackExist: false,
      };
    }

    return feedbackDetail;
  };
}

export default new UserService();
