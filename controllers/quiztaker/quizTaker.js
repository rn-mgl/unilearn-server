import QuizTaker from "../../models/QuizTaker.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";

const createQuizTaker = async (req, res) => {
  const { answer, postQuizId, takerId } = req.body;

  const quizTaker = new QuizTaker(answer, postQuizId, takerId);

  const createdQuizTaker = await quizTaker.createQuizTaker();

  if (!createdQuizTaker) {
    throw new BadRequestError(`Error in creating quiz taker.`);
  }

  return res.status(StatusCodes.OK).json(createdQuizTaker);
};

const getAllQuizTakers = async (req, res) => {
  const { postQuizId } = req.query;

  const quizTakers = await QuizTaker.getAllQuizTakers(postQuizId);

  if (!quizTakers) {
    throw new BadRequestError(`Error in getting quiz takers.`);
  }

  return res.status(StatusCodes.OK).json(quizTakers);
};

export { createQuizTaker, getAllQuizTakers };
