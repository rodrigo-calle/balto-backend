import { Router } from "express";
import {
  createWeek,
  getWeeksByGoal,
  updateWeek,
  deleteWeek,
  getWeek,
} from "../controllers/weekController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.get("/:id", isAuthenticated, getWeek);
router.post("/", isAuthenticated, createWeek);
router.get("/:goalId", isAuthenticated, getWeeksByGoal);
router.put("/:id", isAuthenticated, updateWeek);
router.delete("/:id", isAuthenticated, deleteWeek);

export default router;
