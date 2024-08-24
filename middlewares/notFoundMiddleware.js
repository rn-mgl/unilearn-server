import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "This area is not ours." });
};

export default notFoundMiddleware;
