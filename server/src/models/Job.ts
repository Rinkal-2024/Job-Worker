import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, unique: true },
    title: String,
    company: String,
    location: String,
    description: String,
    sourceUrl: String,
    updatedAt: Date,
    type: String,
  },
  { timestamps: true },
);

export const JobModel = mongoose.model("Job", jobSchema);
