import { Router } from "express";
import {
  createPostQuiz,
  deletePostQuiz,
  getAllPostQuizzes,
  getPostQuiz,
  updatePostQuizInfo,
} from "../../controllers/post/postQuizController.js";

const router = Router();
router.route("/").post(createPostQuiz).get(getAllPostQuizzes);
router
  .route("/:post_quiz_id")
  .get(getPostQuiz)
  .patch(updatePostQuizInfo)
  .delete(deletePostQuiz);

export default router;
