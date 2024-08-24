import CustomAPIError from "./customAPIError.js";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
