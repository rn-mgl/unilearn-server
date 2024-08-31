import { Router } from "express";
import {
  createRoomPost,
  deleteRoomPost,
  getAllRoomPosts,
  getRoomPost,
  updateRoomPostInfo,
} from "../../controllers/room/roomPostController.js";

const router = Router();
router.route("/").get(getAllRoomPosts).post(createRoomPost);
router
  .route("/:room_post_id")
  .get(getRoomPost)
  .patch(updateRoomPostInfo)
  .delete(deleteRoomPost);

export default router;
