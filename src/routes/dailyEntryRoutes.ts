import { Router } from "express";
import {
  createDailyEntry,
  getEntriesByWeek,
  updateDailyEntry,
  deleteDailyEntry,
} from "../controllers/dailyEntryController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post("/", isAuthenticated, createDailyEntry);
router.get("/:weekId", isAuthenticated, getEntriesByWeek);
router.put("/:id", isAuthenticated, updateDailyEntry);
router.delete("/:id", isAuthenticated, deleteDailyEntry);

export default router;
