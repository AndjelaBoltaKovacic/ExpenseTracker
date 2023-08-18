import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const NODE_ENV = process.env.NODE_ENV!;
// set server port
export const PORT = 8000;
// determines how many times the password and salt are hashed before producing the final hash value.
export const SALT_WORK_FACTOR = 10;
// ACCESS_TOKEN Time to live set as 15 minutes
export const ACCESS_TOKEN_TTL = "15m";
// REFRESH_TOKEN Time to live set as 1 year
export const REFRESH_TOKEN_TTL = "1y";
export const DB_URI = process.env.DB_URI!;
export const ORIGIN = process.env.ORIGIN!;
export const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY!;
export const ACCESS_TOKEN_PUBLIC_KEY = process.env.ACCESS_TOKEN_PUBLIC_KEY!;
export const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY!;
export const REFRESH_TOKEN_PUBLIC_KEY = process.env.REFRESH_TOKEN_PUBLIC_KEY!;