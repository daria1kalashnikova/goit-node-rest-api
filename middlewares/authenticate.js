import HttpError from "../helpers/HttpError.js";

import { findUser } from "../services/authServices.js";

import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorizaton header is missing"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer is missing"));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, "Not authorized"));
  }
  const user = await findUser({ email: payload.email });
  if (!user || !user.token) {
    return next(HttpError(401, "User not found"));
  }

  req.user = user;
  next();
};

export default authenticate;
