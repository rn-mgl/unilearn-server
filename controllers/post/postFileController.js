import PostFile from "../../models/PostFile.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";

const createPostFile = async (req, res) => {
  const { name, fileType, file, roomPostId } = req.body;

  const postFile = new PostFile(name, fileType, file, roomPostId);

  const createdPostFile = await postFile.createPostFile();

  if (!createdPostFile) {
    throw new BadRequestError(`Error in creating post file.`);
  }

  return res.status(StatusCodes.OK).json(createdPostFile);
};

const getPostFile = async (req, res) => {
  const { post_file_id } = req.params;

  const postFile = await PostFile.getPostFile(post_file_id);

  if (!postFile || !postFile[0]) {
    throw new NotFoundError(
      `The post file you are trying to get does not exist.`
    );
  }

  return res.status(StatusCodes.OK).json(postFile[0]);
};

const getAllPostFiles = async (req, res) => {
  const { roomPostId } = req.query;

  const postFiles = await PostFile.getAllPostFiles(roomPostId);

  if (!postFiles) {
    throw new BadRequestError(`Error in getting all post files.`);
  }

  return res.status(StatusCodes.OK).json(postFiles);
};

const deletePostFile = async (req, res) => {
  const { type, roomPostId } = req.body;

  let deletedPostFile;

  if (type === "all") {
    if (!roomPostId) {
      throw new BadRequestError(
        `We could not find the post you are trying to modify.`
      );
    }

    deletedPostFile = await PostFile.deletePostFiles(roomPostId);
  } else if (type === "single") {
    const { post_file_id } = req.params;

    const postFile = await PostFile.getPostFile(post_file_id);

    if (!postFile || !postFile[0]) {
      throw new NotFoundError(
        `The file you are trying to delete does not exist.`
      );
    }

    deletedPostFile = await PostFile.deletePostFile(post_file_id);
  } else {
    throw new BadRequestError(`The delete request you want is not valid.`);
  }

  if (!deletedPostFile) {
    throw new BadRequestError(`Error in deleting post file.`);
  }

  return res.status(StatusCodes.OK).json(deletedPostFile);
};

const updatePostFile = async (req, res) => {
  const { post_file_id } = req.params;

  const { name, fileType, file } = req.body;

  const postFile = await PostFile.updatePostFile(
    name,
    fileType,
    file,
    post_file_id
  );

  if (!postFile) {
    throw new BadRequestError(`Error in updating post file.`);
  }

  return res.status(StatusCodes.OK).json(postFile);
};

export {
  createPostFile,
  getPostFile,
  getAllPostFiles,
  deletePostFile,
  updatePostFile,
};
