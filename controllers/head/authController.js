import Head from "../../models/Head.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import {
  createLoginToken,
  decodeToken,
  createRegisterToken,
} from "../../utils/token.js";
import { verificationMail } from "../../utils/mail.js";

const registerHead = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const head = new Head(name, surname, username, email, hashedPassword);

  const createdHead = await head.createHead();

  if (!createdHead) {
    throw new BadRequestError(
      `Error in creating head account. Try again later.`
    );
  }

  const token = createRegisterToken(name, surname, email, username);

  res.status(StatusCodes.OK).json(createdHead);

  verificationMail(email, `${name} ${surname}`, token);

  return;
};

const loginHead = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const head = await Head.getHeadByEmail(candidateEmail);

  if (!head || !head[0]) {
    throw new NotFoundError(`This email does not exist.`);
  }

  const { head_id, email, name, surname, username, password, is_verified } =
    head[0];

  const isCorrectPassword = await verifyPassword(candidatePassword, password);

  if (!isCorrectPassword) {
    throw new UnauthorizedError(`The credentials do not match.`);
  }

  const token = createLoginToken(head_id, email, username);

  return res.status(StatusCodes.OK).json({ token });
};

export { registerHead, loginHead };
