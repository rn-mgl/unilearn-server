import { Router } from "express";
import {
  getLearner,
  updateLearnerInfo,
} from "../../controllers/learner/learnerController.js";

const router = Router();

router.route("/:learner_id").get(getLearner).patch(updateLearnerInfo);

export default router;
