import order from "../../src/models/orders";
const ObjectID = require("mongodb").ObjectID;

class OrderDao {
  findByOrderId = async (orderId) => {
    try {
      return await order.findOne({ _id: new ObjectID(orderId) });
    } catch (err) {
      throw err;
    }
  };

  createOrder = async (data) => {
    try {
      return await order.create(data);
    } catch (err) {
      throw err;
    }
  };

  updateData = async (filter, data) => {
    try {
      return await order.updateOne(filter, data);
    } catch (err) {
      throw err;
    }
  };

  updateDataByOrderId = async (data, orderId) => {
    try {
      return await order.updateOne({ _id: new ObjectID(orderId) }, data);
    } catch (err) {
      throw err;
    }
  };
}

export default new OrderDao();
