import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { processJobs } from "../services/jobProcessor";

export const worker = new Worker(
  "job-queue",
  async (job) => {
    await processJobs(job.data.url, job.data.jobs);
  },
  {
    connection: redisConnection,
    concurrency: parseInt(process.env.WORKER_CONCURRENCY || "5", 10),
  },
);
