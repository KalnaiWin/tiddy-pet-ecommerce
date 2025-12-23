import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  JWT_SECRET: String(process.env.JWT_SECRET),
  MONGO_URI: String(process.env.MONGO_URI),
  NODE_ENV: process.env.NODE_ENV,
  ARCJET_KEY: String(process.env.ARCJET_KEY),
  ARCJET_ENV: String(process.env.ARCJET_ENV),
  CLIENT_URL: String(process.env.CLIENT_URL),
};
