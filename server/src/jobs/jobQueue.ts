import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const jobQueue = new Queue("job-queue", {
  connection: redisConnection,
});
