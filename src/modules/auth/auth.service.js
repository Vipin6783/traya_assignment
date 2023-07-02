import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRY_IN_MIN,
  REFRESH_TOKEN_EXPIRY_IN_MIN,
} from "../../config";
import UserDao from "../../daos/userDao";

class AuthService {
  loginOrSignup = async (emailId) => {
    if (!emailId) {
      throw new Error("Email is mandatory");
    }
    const userRef = await UserDao.findByEmailId(emailId);

    if (!userRef ) {
      const newUserRef = await UserDao.createUser(emailId);

      return {message: "User created successfully", userId: newUserRef._id.toString()}
    } else{
      return this.getAccessAndRefreshToken(userRef);

    }
  };

  getAccessAndRefreshToken = async (userRef) => {
    const data = {
      time: Date(),
      userId: userRef._id.toString(),
    };

    const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRY_IN_MIN,
    });
    const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY_IN_MIN,
    });

    return {message: "User sign in successfully", accessToken, refreshToken };
  };
}

export default new AuthService();
