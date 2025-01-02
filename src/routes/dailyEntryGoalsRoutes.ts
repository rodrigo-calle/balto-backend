import { Router } from "express";
import {
  createDailyGoals,
  deleteDailyGoals,
  getDailyGoals,
  updateDailyGoals,
} from "../controllers/dailyGoalsController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.get("/:dailyEntryId", isAuthenticated, getDailyGoals);
router.post("/", isAuthenticated, createDailyGoals);
router.patch("/:id", isAuthenticated, updateDailyGoals);
router.delete("/:id", isAuthenticated, deleteDailyGoals);

export default router;
