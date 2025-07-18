import crypto from "crypto";
import { JobModel } from "../models/Job";
import { ImportLog } from "../models/ImportLog";

interface JobData {
  guid?: string;
  title?: string;
  description?: string;
  pubDate?: string;
  link?: string;
  [key: string]: any;
}

function generateJobId(job: JobData): string {
  const base = job.guid || job.link || job.title || JSON.stringify(job);
  return crypto.createHash("md5").update(base).digest("hex");
}

export async function processJobs(fileName: string, jobs: JobData[]) {
  let newJobs = 0;
  let updatedJobs = 0;
  const failedJobs: { guid: string; reason: string }[] = [];

  for (const rawJob of jobs) {
    try {
      const guid = rawJob.guid || rawJob.link || rawJob.title;
      if (!guid) throw new Error("Missing GUID/link/title");

      const jobId = generateJobId(rawJob);
      const jobData = { ...rawJob, jobId }; // Add jobId to schema

      const existing = await JobModel.findOne({ jobId });

      if (existing) {
        await JobModel.updateOne({ jobId }, { $set: jobData });
        updatedJobs++;
      } else {
        await new JobModel(jobData).save();
        newJobs++;
      }
    } catch (err: any) {
      const jobGuid = rawJob.guid || rawJob.link || "unknown";
      failedJobs.push({ guid: jobGuid, reason: err.message });
      console.error(` Failed to process job ${jobGuid}:`, err.message);
    }
  }

  try {
    await ImportLog.create({
      timestamp: new Date(),
      fileName,
      totalFetched: jobs.length,
      totalImported: newJobs + updatedJobs,
      newJobs,
      updatedJobs,
      failedJobs,
    });
  } catch (logErr: any) {
    console.error("Failed to save import log:", logErr.message);
  }

  return {
    fileName,
    totalFetched: jobs.length,
    totalImported: newJobs + updatedJobs,
    newJobs,
    updatedJobs,
    failedJobsCount: failedJobs.length,
  };
}
