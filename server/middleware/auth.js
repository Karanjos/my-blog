import jwt from "jsonwebtoken";
import User  from "../models/User.js";
import ErrorHandler from "./errorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(401, "Login required to access this resource")
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});
