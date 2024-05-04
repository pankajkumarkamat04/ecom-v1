import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import errorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModel.js";

const isAuthorized =catchAsyncError( async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorHandler("Please Login", 401));
  }
    const verify = await jwt.verify(req.cookies.token, process.env.JWT_SCERET);
    req.user = await userModel.findById(verify.id);
  next();

});

const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(
          `${req.user.role} don't have access of this resource`,
          401
        )
      );
    }
    next();
  };
};

export { isAuthorized, authorizedRole };
