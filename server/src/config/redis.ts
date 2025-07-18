import { RedisOptions } from "ioredis";

export const redisConnection: RedisOptions = {
  host: "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};
