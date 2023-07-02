import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, TOKEN_HEADER_KEY } from "../config";
import AppUtility from "../utils/appUtility";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers[TOKEN_HEADER_KEY]?.split(" ")[1];
    if (!token) {
      next(new Error("Token not found"));
    }

    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);

    if (verified) {
      const decodedToken = AppUtility.parseJwt(token);
      req.userMongoId = decodedToken.userId;
      next();
    } else {
      next(new Error("Invalid token"));
    }
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

export default authMiddleware;
