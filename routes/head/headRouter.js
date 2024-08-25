import { Router } from "express";
import { getHead } from "../../controllers/head/headController.js";

const router = Router();

router.route("/").post(getHead);

export default router;
