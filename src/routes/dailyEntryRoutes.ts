import { Router } from "express";
import {
  createDailyEntry,
  getEntriesByWeek,
  updateDailyEntry,
  deleteDailyEntry,
  getDailyEntry,
} from "../controllers/dailyEntryController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post("/", isAuthenticated, createDailyEntry);
router.get("/:id", isAuthenticated, getDailyEntry);
router.get("/weeks/:weekId", isAuthenticated, getEntriesByWeek);
router.patch("/:id", isAuthenticated, updateDailyEntry);
router.delete("/:id", isAuthenticated, deleteDailyEntry);

export default router;
