import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message:
      err.message || "There is a problem on our end. Please try to refresh.",
  };

  res.status(customError.statusCode).send(customError.message);
};

export default errorMiddleware;
