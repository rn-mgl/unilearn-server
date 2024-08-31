import { Router } from "express";
import {
  loginAdmin,
  registerAdmin,
} from "../../controllers/admin/authController.js";

const router = Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(registerAdmin);

export default router;
