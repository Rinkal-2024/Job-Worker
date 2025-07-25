import app from "./app";
import "./jobs/jobWorker";
import "./cron-job/feedScheduler";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log("your website is served on http://localhost:"+PORT);
});
