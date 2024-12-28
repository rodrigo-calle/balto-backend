import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes";
import weekRoutes from "./routes/weekRoutes";
import dailyEntryRoutes from "./routes/dailyEntryRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/goals", goalRoutes);
app.use("/weeks", weekRoutes);
app.use("/daily-entries", dailyEntryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
