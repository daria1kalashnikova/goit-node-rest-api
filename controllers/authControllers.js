import gravatar from "gravatar";
import axios from "axios";
import fs from "node:fs/promises";
import path from "node:path";
import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const avatarsDir = path.resolve("public", "avatars");

const registerController = async (req, res) => {
  const { email } = req.body;
  const gravatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  const response = await axios.get(gravatarURL, {
    responseType: "arraybuffer",
  });

  const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}.jpg`;
  const avatarPath = path.join(avatarsDir, filename);

  await fs.writeFile(avatarPath, response.data);

  const avatarURL = path.join("avatars", filename);

  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  const baseURL = `${req.protocol}://${req.get("host")}`;
  const fullAvatarURL = `${baseURL}/${newUser.avatarURL.replace(/\\/g, "/")}`;

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: fullAvatarURL,
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
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrentController = (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({ email, subscription, avatarURL });
};

const logOutController = async (req, res) => {
  const { id } = req.user;
  await authServices.logOutUser(id);

  res.status(204).end();
};

const updateAvatarController = async (req, res) => {
  const { id } = req.user;

  if (!id || !req.file) {
    throw HttpError(401, "Not authorized");
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);

  try {
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);

    const user = await authServices.updateAvatarUser(id, avatarURL);

    const baseURL = `${req.protocol}://${req.get("host")}`;
    const fullAvatarURL = `${baseURL}/${user.avatarURL.replace(/\\/g, "/")}`;

    res.json({
      avatarURL: fullAvatarURL,
    });
  } catch (error) {
    await fs.unlink(newPath).catch(() => {});
    throw error;
  }
};

export default {
  registerController: ctrlWrapper(registerController),
  logInController: ctrlWrapper(logInController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logOutController: ctrlWrapper(logOutController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
