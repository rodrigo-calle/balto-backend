import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes";
import weekRoutes from "./routes/weekRoutes";
import dailyEntryRoutes from "./routes/dailyEntryRoutes";
import authRoutes from "./routes/authRoutes";
import weekleObjectiveRoutes from "./routes/weekleObjectivesRoutes";
import dailyGoalsRoutes from "./routes/dailyEntryGoalsRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/goals", goalRoutes);
app.use("/weeks", weekRoutes);
app.use("/daily-entries", dailyEntryRoutes);
app.use("/auth", authRoutes);
app.use("/weekle-goals", weekleObjectiveRoutes);
app.use("/daily-goals", dailyGoalsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Balto!");
});

export default app;
