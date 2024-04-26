import { json } from "express";

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if(err.name == "CaseError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(404, message);
  }
  if(err.name == "JsonWebTokenError") {
    const message = "Login required to access this resource";
    err = new ErrorHandler(401, message);
  }
  if(err.name == "TokenExpiredError") {
    const message = "Session expired. Please login again";
    err = new ErrorHandler(401, message);
  }
  if(err.name == "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    err = new ErrorHandler(400, message);
  }
  if(err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

export default ErrorHandler;