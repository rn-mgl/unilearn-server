import { Router } from "express";
import {
  createPostFile,
  deletePostFile,
  getAllPostFiles,
  getPostFile,
  updatePostFile,
} from "../../controllers/post/postFileController.js";

const router = Router();
router.route("/").get(getAllPostFiles).post(createPostFile);
router
  .route("/:post_file_id")
  .get(getPostFile)
  .patch(updatePostFile)
  .delete(deletePostFile);

export default router;
