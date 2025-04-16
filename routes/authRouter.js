import express from "express";

import authenticate from "../middlewares/authenticate.js";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema, authLogInSchema } from "../schemas/authSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLogInSchema),
  authControllers.logInController
);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.post("/logout", authenticate, authControllers.logOutController);

export default authRouter;
