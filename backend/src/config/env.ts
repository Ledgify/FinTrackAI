import "dotenv/config";

export const env = {
  PORT: parseInt(process.env.PORT || "8000", 10),
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
};
