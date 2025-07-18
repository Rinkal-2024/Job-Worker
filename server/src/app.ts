import express from "express";
import dotenv from "dotenv";
dotenv.config();

import historyRoutes from "./routes/history";

const app = express();
app.use(express.json());
app.use("/api", historyRoutes);

export default app;
