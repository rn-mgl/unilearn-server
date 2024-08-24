import { Router } from "express";
import { createHead } from "../controllers/headController.js";

const router = Router();

router.route("/").post(createHead);

export default router;
