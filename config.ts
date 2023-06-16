import dotenv from 'dotenv'
dotenv.config()

export default {
  DAILY_LIMIT: 80000,
  PORT: process.env.PORT ?? 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  LINE_LENGTH: 80,
}