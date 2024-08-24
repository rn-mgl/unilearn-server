import Head from "../models/Head.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/password.js";
import { BadRequestError } from "../errors/index.js";

const createHead = async (req, res) => {
  const { name, surname, username, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const head = new Head(name, surname, username, email, hashedPassword);

  const newHead = await head.createHead();

  if (!newHead) {
    throw new BadRequestError(`Error in creating head account.`);
  }

  return res.json({ create: newHead, success: true });
};

export { createHead };
