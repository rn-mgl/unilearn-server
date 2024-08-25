import Head from "../../models/Head.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../../errors/index.js";

const getHead = async (req, res) => {
  const { head_id } = req.params;

  const head = Head.getHeadById(head_id);

  if (!head) {
    throw new NotFoundError(`This head account does not exist.`);
  }

  return res.status(StatusCodes.OK).json({ success: true, head });
};

const updateHeadInfo = async (req, res) => {
  const { head_id } = req.params;
  const { name, surname, username, image } = req.body;

  const head = Head.updateHeadInfo(name, surname, username, image, head_id);

  if (!head) {
    throw new BadRequestError(`There was a problem updating the information.`);
  }

  return res.status(StatusCodes.OK).json({ success: true, head });
};

export { getHead, updateHeadInfo };
