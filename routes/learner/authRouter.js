import { Router } from "express";
import {
  loginLearner,
  registerLearner,
} from "../../controllers/learner/authController.js";

const router = Router();

router.route("/login").post(loginLearner);
router.route("/register").post(registerLearner);

export default router;
