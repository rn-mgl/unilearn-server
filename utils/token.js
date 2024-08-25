import jwt from "jsonwebtoken";

const createLoginToken = (id, email, username) => {
  const token = jwt.sign({ id, email, username }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_END,
  });

  return token;
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_TOKEN, {
    maxAge: process.env.JWT_END,
  });

  return decoded;
};

export { createLoginToken, decodeToken };
