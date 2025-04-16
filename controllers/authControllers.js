import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const logInController = async (req, res) => {
  const { token } = await authServices.logInUser(req.body);
  res.json({
    token,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  logInController: ctrlWrapper(logInController),
};
