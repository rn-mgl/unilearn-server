import Admin from "../../models/Admin.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getAdmin = async (req, res) => {
  const { admin_id } = req.params;

  const admin = await Admin.getAdminById(admin_id);

  if (!admin || !admin[0]) {
    throw new NotFoundError(`Could not find the admin account.`);
  }

  return res.status(StatusCodes.OK).json(admin);
};

const updateAdminInfo = async (req, res) => {
  const { admin_id } = req.params;
  const { name, surname, username, image } = req.body;

  const admin = await Admin.updateAdminInfo(
    name,
    surname,
    username,
    image,
    admin_id
  );

  if (!admin) {
    throw new BadRequestError(`There was a problem updating the information.`);
  }

  return res.status(StatusCodes.OK).json(admin);
};

export { getAdmin, updateAdminInfo };
