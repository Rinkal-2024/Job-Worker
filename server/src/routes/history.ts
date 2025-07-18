import express from "express";
import { ImportLog } from "../models/ImportLog";

const router = express.Router();

router.get("/import-history", async (_req, res) => {
  const logs = await ImportLog.find().sort({ createdAt: -1 }).limit(50);
  res.json(logs);
});

export default router;
