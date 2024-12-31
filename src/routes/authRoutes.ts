import { Router } from "express";
import {
  createUser,
  loginUser,
  validateToken,
} from "../controllers/authController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/validate-token", isAuthenticated, validateToken);

export default router;
