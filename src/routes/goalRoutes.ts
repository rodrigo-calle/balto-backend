import { Router } from "express";
import { createGoal, getGoals } from "../controllers/goalController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post("/", isAuthenticated, createGoal);
router.get("/", isAuthenticated, getGoals);

export default router;
