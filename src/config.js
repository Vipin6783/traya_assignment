import dotenv from "dotenv";

dotenv.config(); // it loads the defined variables from .env

export const env = process.env.NODE_ENV || "development";

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/traya_db?authSource=admin&readPreference=primary&directConnection=true&ssl=false";


export const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY || "sdcnkjszcnkzdcnjzcjj";
export const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || "uytrkjszcnkzdchgfdjj";
export const TOKEN_HEADER_KEY = process.env.JWT_SECRET_KEY || "authorization";
export const ACCESS_TOKEN_EXPIRY_IN_MIN =
  process.env.ACCESS_TOKEN_EXPIRY_IN_MIN || "100m"; // we can change as per requirement
export const REFRESH_TOKEN_EXPIRY_IN_MIN =
  process.env.REFRESH_TOKEN_EXPIRY_IN_MIN || "150m";


