import { Router } from "express";
import {
  createDailyEntry,
  getEntriesByWeek,
  updateDailyEntry,
  deleteDailyEntry,
} from "../controllers/dailyEntryController";

const router = Router();

router.post("/", createDailyEntry);
router.get("/:weekId", getEntriesByWeek);
router.put("/:id", updateDailyEntry);
router.delete("/:id", deleteDailyEntry);

export default router;
