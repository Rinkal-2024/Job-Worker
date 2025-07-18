import cron from "node-cron";
import { jobQueue } from "../jobs/jobQueue";
import { fetchJobsFromUrl } from "../services/jobFetcher";
import { feedUrls } from "../config/constants";

cron.schedule("* * * * *", async () => {
  console.log("Cron!");
  try {
    for (const url of feedUrls) {
    const jobs = await fetchJobsFromUrl(url);

    await jobQueue.add("import-job", { url, jobs });
  }
  } catch (error) {
    console.error("error in cron job:", error);
    
  }
});
