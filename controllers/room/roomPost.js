import RoomPost from "../../models/RoomPost.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/";

const createRoomPost = async (req, res) => {
  const { title, body, roomId, postedBy, type } = req.body;

  const roomPost = new RoomPost(title, body, roomId, postedBy, type);

  const createdRoomPost = await roomPost.createRoomPost();

  if (!createdRoomPost) {
    throw new BadRequestError(`Error in creating room post.`);
  }

  return res.status(StatusCodes.OK).json(createdRoomPost);
};

const getRoomPost = async (req, res) => {
  const { room_post_id } = req.params;

  const roomPost = await RoomPost.getRoomPost(room_post_id);

  if (!roomPost || !roomPost[0]) {
    throw new NotFoundError(
      `The room post you are trying to get does not exist.`
    );
  }

  return res.status(StatusCodes.OK).json(roomPost[0]);
};

const getAllRoomPosts = async (req, res) => {
  const { room_id } = req.params;

  const roomPosts = await RoomPost.getAllRoomPosts(room_id);

  if (!roomPosts) {
    throw new BadRequestError(`Error in getting all room posts.`);
  }

  return res.status(StatusCodes.OK).json(roomPosts);
};

const deleteRoomPost = async (req, res) => {
  const { room_post_id } = req.params;

  const roomPost = await RoomPost.getRoomPost(room_post_id);

  if (!roomPost || !roomPost[0]) {
    throw new NotFoundError(
      `The post you are trying to delete does not exist.`
    );
  }

  const deletedPost = await RoomPost.deleteRoomPost(room_post_id);

  if (!deletedPost) {
    throw new BadRequestError(`Error in deleting room post.`);
  }

  res.status(StatusCodes.OK).json(roomPost);
};

const updateRoomPostInfo = async (req, res) => {
  const { title, body, type } = req.body;
  const { room_post_id } = req.params;

  const roomPost = await RoomPost.updateRoomPostInfo(
    title,
    body,
    type,
    room_post_id
  );

  if (!roomPost) {
    throw new BadRequestError(`Error in updating post content.`);
  }

  return res.status(StatusCodes.OK).json(roomPost);
};

export {
  createRoomPost,
  getRoomPost,
  getAllRoomPosts,
  deleteRoomPost,
  updateRoomPostInfo,
};
