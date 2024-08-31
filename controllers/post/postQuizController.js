import PostQuiz from "../../models/PostQuiz.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";
import RoomPost from "../../models/RoomPost.js";

const createPostQuiz = async (req, res) => {
  const { question, answer, choice1, choice2, choice3, choice4, roomPostId } =
    req.body;

  const postQuiz = new PostQuiz(
    question,
    answer,
    choice1,
    choice2,
    choice3,
    choice4,
    roomPostId
  );

  const createdQuiz = await postQuiz.createPostQuiz();

  if (!createdQuiz) {
    throw new BadRequestError(`Error in creating quiz.`);
  }

  return res.status(StatusCodes.OK).json(createdPostQuiz);
};

const getPostQuiz = async (req, res) => {
  const { post_quiz_id } = req.params;

  const postQuiz = await PostQuiz.getPostQuiz(post_quiz_id);

  if (!postQuiz || !postQuiz[0]) {
    throw new NotFoundError(
      `The post quiz you are trying to get does not exist.`
    );
  }

  res.status(StatusCodes.OK).json(postQuiz[0]);
};

const getAllPostQuizzes = async (req, res) => {
  const { roomPostId } = req.params;

  const postQuizzes = await PostQuiz.getAllPostQuizzes(roomPostId);

  if (!postQuizzes) {
    throw new BadRequestError(`Error in getting post quizzes.`);
  }

  return res.status(StatusCodes.OK).json(postQuizzes);
};

const updatePostQuizInfo = async (req, res) => {
  const { question, answer, choice1, choice2, choice3, choice4 } = req.body;

  const { post_quiz_id } = req.params;

  const postQuiz = await PostQuiz.updatePostQuizInfo(
    question,
    answer,
    choice1,
    choice2,
    choice3,
    choice4,
    post_quiz_id
  );

  if (!postQuiz) {
    throw new BadRequestError(`Error in updating post quiz info.`);
  }

  return res.status(StatusCodes.OK).json(updatePostQuizInfo);
};

const deletePostQuiz = async (req, res) => {
  const { post_quiz_id } = req.params;

  const postQuiz = await PostQuiz.deletePostQuiz(post_quiz_id);

  if (!postQuiz) {
    throw new BadRequestError(`Error in deleting quiz.`);
  }

  return res.status(StatusCodes.OK).json(deletePostQuiz);
};

export {
  createPostQuiz,
  getPostQuiz,
  getAllPostQuizzes,
  updatePostQuizInfo,
  deletePostQuiz,
};
