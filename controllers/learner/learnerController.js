import Learner from "../../models/Learner.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getLearner = async (req, res) => {
  const { learner_id } = req.params;

  const learner = await Learner.getLearnerById(learner_id);

  if (!learner || !learner[0]) {
    throw new NotFoundError(`This learner account does not exist`);
  }

  return res.status(StatusCodes.OK).json(learner);
};

const updateLearnerInfo = async (req, res) => {
  const { learner_id } = req.params;

  const { name, surname, username, image } = req.body;

  const learner = await Learner.updateLearnerInfo(
    name,
    surname,
    username,
    image,
    learner_id
  );

  if (!learner) {
    throw new BadRequestError(`There was a problem updating the information.`);
  }

  return res.status(StatusCodes.OK).json(learner);
};

export { getLearner, updateLearnerInfo };
