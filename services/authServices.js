import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt.js";
import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...data, password: hashPassword });

  return newUser;
};

export const logInUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    email,
  };

  const token = generateToken(payload);
  await user.update({ token });

  return {
    token,
  };
};

export const logOutUser = async (id) => {
  const user = await findUser({ id });
  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }
  await user.update({ token: null });
};

export const updateAvatarUser = async (id, avatarURL) => {
  const user = await findUser({ id });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ avatarURL });
  return user;
};
