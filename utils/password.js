import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
};

export { hashPassword };
