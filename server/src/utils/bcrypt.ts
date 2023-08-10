import * as bcrypt from 'bcrypt';

const SALT = 10;

const encodePassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT);
};

const comparePassword = async (
  password: string,
  encodedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, encodedPassword);
};

export { encodePassword, comparePassword };
