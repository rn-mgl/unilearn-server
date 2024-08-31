import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoomInfo,
} from "../../controllers/room/roomController.js";

const router = Router();
router.route("/").post(createRoom).get(getAllRooms);
router.route("/:room_id").get(getRoom).patch(updateRoomInfo).delete(deleteRoom);

export default router;
