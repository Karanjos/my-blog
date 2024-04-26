import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorHandler.js";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role, phone, profilePic, isActive } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    profilePic,
    isActive,
  });
  generateToken(user, 201, res, "User registered successfully");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter email and password"));
  }
  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }
  generateToken(user, 200, res, "User logged in successfully");
});

// logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return next(new ErrorHandler(404, "User not found with this email"));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(500, error.message));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(400, "Password reset token is invalid or has expired")
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(400, "Password does not match"));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  generateToken(user, 200, res, "Password reset successfully");
});

export const profile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

export default { register, login, logout, forgotPassword, resetPassword, profile, getUser } ;