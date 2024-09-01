import { UnauthorizedError } from "../errors/index.js";
import { decodeToken } from "../utils/token.js";

const headAuthMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith(`Bearer Head `)) {
    throw new UnauthorizedError(`You are not allowed to enter. Log in first.`);
  }

  const token = bearerToken.split(" ").at(-1);

  const { id } = decodeToken(token);

  req.user = { id };

  next(req);
};

export default headAuthMiddleware;
