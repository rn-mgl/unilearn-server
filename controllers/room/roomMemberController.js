import RoomMember from "../../models/RoomMember.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";

const createRoomMember = async (req, res) => {
  const { roomId, memberId, isModifier } = req.body;

  const roomMember = new RoomMember(roomId, memberId, isModifier);

  const createdRoomMember = await roomMember.createRoomMember();

  if (!createdRoomMember) {
    throw new BadRequestError(`Error in creating room member.`);
  }

  return res.status(StatusCodes.OK).json(createRoomMember);
};

const deleteRoomMember = async (req, res) => {
  const { room_member_id } = req.params;

  const roomMember = await RoomMember.getRoomMember(room_member_id);

  if (!roomMember || !roomMember[0]) {
    throw new NotFoundError(
      `The room member you are trying to remove does not exist.`
    );
  }

  const deletedRoomMember = await RoomMember.deleteRoomMember(room_member_id);

  if (!deletedRoomMember) {
    throw new BadRequestError(`Error in deleting room member.`);
  }

  return res.status(StatusCodes.OK).json(deletedRoomMember);
};

const getRoomMember = async (req, res) => {
  const { room_member_id } = req.params;

  const roomMember = await RoomMember.getRoomMember(room_member_id);

  if (!roomMember || !roomMember[0]) {
    throw new NotFoundError(
      `The room member you are trying to access does not exist.`
    );
  }

  return res.status(StatusCodes.OK).json(roomMember[0]);
};

const getAllRoomMembers = async (req, res) => {
  const { roomId } = req.body;

  const roomMembers = await RoomMember.getAllRoomMembers(roomId);

  if (!roomMembers) {
    throw new BadRequestError(`Error in getting room members.`);
  }

  return res.status(StatusCodes.OK).json(roomMembers);
};

export { createRoomMember, deleteRoomMember, getRoomMember, getAllRoomMembers };
