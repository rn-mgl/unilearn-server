import { Router } from "express";
import {
  createRoomMember,
  deleteRoomMember,
  getRoomMember,
  getAllRoomMembers,
} from "../../controllers/room/roomMemberController.js";

const router = Router();
router.route("/").get(getAllRoomMembers).post(createRoomMember);
router.route("/:room_member_id").get(getRoomMember).post(deleteRoomMember);

export default router;
