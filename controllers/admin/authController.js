import Admin from "../../models/Admin";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { createLoginToken, createRegisterToken } from "../../utils/token.js";
import { verificationMail } from "../../utils/mail.js";

const registerAdmin = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const admin = new Admin(name, surname, username, email, hashedPassword);

  const createAdmin = await admin.createAdmin();

  if (!createAdmin) {
    throw new BadRequestError(`Error in creating admin.`);
  }

  const token = createRegisterToken(name, surname, email, username);

  res.status(StatusCodes.OK).json({ token });

  verificationMail(email, `${name} ${surname}`, token);
};

const loginAdmin = async (req, res) => {
  const { candidateEmail, candidatePassword } = req.body;

  const admin = await Admin.getAdminByEmail(candidateEmail);

  if (!admin || !admin[0]) {
    throw new NotFoundError(`This admin account does not exist.`);
  }

  const { admin_id, name, surname, username, email, password, is_verified } =
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

  const token = createLoginToken(admin_id, email, username);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, token, isVerified: is_verified });
};

export { registerAdmin, loginAdmin };
