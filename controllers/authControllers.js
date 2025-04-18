import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";
import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const avatarsDir = path.resolve("public", "avatars");

const registerController = async (req, res) => {
  const { email } = req.body;

  let avatarURL = null;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    avatarURL = path.join("avatars", filename);
  } else {
    avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  }

  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const logInController = async (req, res) => {
  const { token } = await authServices.logInUser(req.body);
  const user = await authServices.findUser({ email: req.body.email });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentController = (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logOutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logOutUser(id);

  res.status(204).end();
};

export default {
  registerController: ctrlWrapper(registerController),
  logInController: ctrlWrapper(logInController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logOutController: ctrlWrapper(logOutController),
};
