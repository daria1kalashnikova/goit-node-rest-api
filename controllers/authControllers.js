import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const logInController = async (req, res) => {
  const { token } = await authServices.logInUser(req.body);
  res.json({
    token,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
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

  res.status(204);
};

export default {
  registerController: ctrlWrapper(registerController),
  logInController: ctrlWrapper(logInController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logOutController: ctrlWrapper(logOutController),
};
