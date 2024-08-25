import { Router } from "express";
import {
  loginHead,
  registerHead,
} from "../../controllers/head/authController.js";

const router = Router();

router.route("/login").post(loginHead);
router.route("/register").post(registerHead);

export default router;
