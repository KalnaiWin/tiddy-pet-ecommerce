import "dotenv/config";

export const ENV = {
  PORT: parseInt(process.env.PORT ?? "8080", 10),
};
