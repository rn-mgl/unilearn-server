import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import Head from "../../models/Head.js";
import { verificationMail } from "../../utils/mail.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { createLoginToken, createRegisterToken } from "../../utils/token.js";

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

  res.status(StatusCodes.OK).json({ success: true, createdHead });

  await verificationMail(email, `${name} ${surname}`, token);

  return;
};

const loginHead = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const head = await Head.getHeadByEmail(candidateEmail);

  if (!head || !head[0]) {
    throw new NotFoundError(`This head account does not exist.`);
  }

  const { head_id, email, name, surname, username, password, is_verified } =
    head[0];

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

  const token = createLoginToken(head_id, email, username);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, token, isVerified: is_verified });
};

export { loginHead, registerHead };
