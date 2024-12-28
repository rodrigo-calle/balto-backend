import { Router } from "express";
import { createGoal, getGoals } from "../controllers/goalController";

const router = Router();

router.post("/", createGoal);
router.get("/", getGoals);

export default router;
