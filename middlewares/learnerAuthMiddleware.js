import { UnauthorizedError } from "../errors/index.js";
import { decodeToken } from "../utils/token.js";

const learnerAuthMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith(`Bearer Learner `)) {
    throw new UnauthorizedError(
      `You are not allowed to enter. Please log in first.`
    );
  }

  const token = bearerToken.split(" ").at(-1);

  const { id } = decodeToken(token);

  req.user = { id };

  next(req);
};

export default learnerAuthMiddleware;
