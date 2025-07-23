import express from "express";
import dotenv from "dotenv";
dotenv.config();

import historyRoutes from "./routes/history";

const app = express();
app.use(express.json());
app.use("/api", historyRoutes);

app.use("/*", (req, res) => {
  res.send("Test Route");
});

export default app;
