import { Router } from "express";
import {
  createQuizTaker,
  getAllQuizTakers,
} from "../../controllers/quiztaker/quizTakerController.js";

const router = Router();
router.route("/").get(getAllQuizTakers).post(createQuizTaker);

export default router;
