import user from "../../src/models/users";

class UserDao {
  findByEmailId = async (emailId) => {
    try {
      return await user.findOne({ email: emailId });
    } catch (err) {
      throw err;
    }
  };

  createUser = async (emailId) => {
    try {
      return await user.create({ email: emailId });
    } catch (err) {
      throw err;
    }
  };
}

export default new UserDao();
