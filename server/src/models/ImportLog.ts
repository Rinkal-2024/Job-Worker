import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema({
  fileName: String,
  timestamp: { type: Date, default: Date.now },
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{ reason: String, data: Object }],
});

export const ImportLog = mongoose.model("import_logs", importLogSchema);
