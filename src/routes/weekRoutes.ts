import { Router } from "express";
import {
  createWeek,
  getWeeksByGoal,
  updateWeek,
  deleteWeek,
} from "../controllers/weekController";

const router = Router();

router.post("/", createWeek);
router.get("/:goalId", getWeeksByGoal);
router.put("/:id", updateWeek);
router.delete("/:id", deleteWeek);

export default router;
