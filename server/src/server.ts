import app from "./app";
import "./jobs/jobWorker";
import "./cron-job/feedScheduler";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

process.on("uncaughtException", (err) => {
  console.error(" Uncaught Exception:", err);
});

start();