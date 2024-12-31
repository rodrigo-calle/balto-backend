import { Router } from "express";
import { createGoal, getGoal, getGoals } from "../controllers/goalController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.get("/", isAuthenticated, getGoals);
router.get("/:id", isAuthenticated, getGoal);
router.post("/", isAuthenticated, createGoal);

export default router;
