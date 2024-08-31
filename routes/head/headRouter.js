import { Router } from "express";
import {
  getHead,
  updateHeadInfo,
} from "../../controllers/head/headController.js";

const router = Router();

router.route("/").post(getHead);
router.route("/:head_id").patch(updateHeadInfo);

export default router;
