import Learner from "../../models/Learner.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { createLoginToken, createRegisterToken } from "../../utils/token.js";
import { verificationMail } from "../../utils/mail.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";

const registerLearner = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const learner = new Learner(name, surname, username, email, hashedPassword);

  const createdLearner = await learner.createLearner();

  if (!createdLearner) {
    throw new BadRequestError(`Error in creating learner account.`);
  }

  const token = createRegisterToken(name, surname, email, username);

  res.status(StatusCodes.OK).json({ token });

  verificationMail(email, `${name} ${surname}`, token);

  return;
};

const loginLearner = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const learner = await Learner.getLearnerByEmail(candidateEmail);

  if (!learner || !learner[0]) {
    throw new NotFoundError(`This learner account does not exist.`);
  }

  const { learner_id, name, surname, username, email, password, is_verified } =
    learner[0];

  const isCorrectPassword = await verifyPassword(candidatePassword, password);

  if (!isCorrectPassword) {
    throw new UnauthorizedError(`The credentials do not match.`);
  }

  if (!is_verified) {
    const verificationToken = createRegisterToken(
      name,
      surname,
      email,
      username
    );

    const sendVerification = await verificationMail(
      email,
      `${name} ${surname}`,
      verificationToken
    );

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: true, isVerified: is_verified });
  }

  const token = createLoginToken(learner_id, email, username);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, isVerified: is_verified, token });
};

export { registerLearner, loginLearner };
