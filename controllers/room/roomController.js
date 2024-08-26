import Room from "../../models/Room.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";

const createRoom = async (req, res) => {
  const { name, description, isPublic } = req.body;

  const { id } = req.user;

  const room = new Room(name, description, id, isPublic);

  const createdRoom = await room.createRoom();

  if (!createdRoom) {
    throw new BadRequestError(`Error in creating room.`);
  }

  return res.status(StatusCodes.OK).json(createdRoom);
};

const getRoom = async (req, res) => {
  const { room_id } = req.params;

  const room = await Room.getRoom(room_id);

  if (!room || !room[0]) {
    throw new NotFoundError(`This room does not exist.`);
  }

  return res.status(StatusCodes.OK).json(room[0]);
};

const getAllRooms = async (req, res) => {
  const { type } = req.query;

  let rooms;

  if (type === "public") {
    rooms = await Room.getAllPublicRooms();
  } else if (type === "private") {
    rooms = await Room.getAllPrivateRooms();
  } else {
    throw new BadRequestError(`This type of room is not valid`);
  }

  if (!rooms) {
    throw new BadRequestError(`Error in getting all ${type} rooms.`);
  }

  return res.status(StatusCodes.OK).json(rooms);
};

const deleteRoom = async (req, res) => {
  const { room_id } = req.params;

  const room = await Room.deleteRoom(room_id);

  if (!room) {
    throw new BadRequestError(`Error in deleting this room.`);
  }

  return res.status(StatusCodes.OK).json(room);
};

const updateRoomInfo = async (req, res) => {
  const { name, description, profileImage, bannerImage, isPublic } = req.body;
  const { room_id } = req.params;

  const room = await Room.updateRoomInfo(
    name,
    description,
    profileImage,
    bannerImage,
    isPublic,
    room_id
  );

  if (!room) {
    throw new BadRequestError(`Error in updating room information.`);
  }

  return res.status(StatusCodes.OK).json(room);
};

export { createRoom, getRoom, getAllRooms, deleteRoom, updateRoomInfo };
