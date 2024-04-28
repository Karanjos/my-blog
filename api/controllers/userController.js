import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({ message: "All users" });
};

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You are not authorized to perform this action")
    );
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length === 0 || req.body.username === "") {
      return next(errorHandler(400, "Username cannot be empty"));
    }
    //only letters are allowed
    if (!req.body.username.match(/^[a-zA-Z]+$/)) {
      return next(errorHandler(400, "Username can only contain letters"));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You are not authorized to perform this action")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
