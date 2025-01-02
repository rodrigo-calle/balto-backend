import { Router } from "express";
import { isAuthenticated } from "../middleware";
import {
  createWeekObjective,
  removeWeekObjective,
  updateWeekObjective,
} from "../controllers/weekleObjectivesController";

const router = Router();

router.post("/", isAuthenticated, createWeekObjective);
router.patch("/:id", isAuthenticated, updateWeekObjective);
router.delete("/:id", isAuthenticated, removeWeekObjective);

export default router;
