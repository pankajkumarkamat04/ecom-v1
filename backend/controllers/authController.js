import catchAsyncError from "../middleware/catchAsyncError.js";
import userModel from "../models/userModel.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import errorHandler from "../utils/errorHandler.js";
import passwordResetMailTemplate from "../utils/mailTemplate.js";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

const userRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone_no } = req.body;

  if (!name) {
    return next(new errorHandler(`Please Enter Your Name`, 400));
  }
  if (!email) {
    return next(new errorHandler(`Please Enter Your Email`, 400));
  }
  if (!password) {
    return next(new errorHandler(`Please Enter Your Password`, 400));
  }

  console.log(phone_no);
  const user = await userModel.create({ name, email, password, phone_no });

  const token = await user.getJwtToken();

  sendToken(token, 200, res);
});

const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    next(new errorHandler("Please Enter Email & Password", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("Please Enter Vaild Email & Password", 404));
  }
  const macthPassword = await user.comparePassword(password);
  if (!macthPassword) {
    return next(new errorHandler("Please Enter Vaild Email & Password", 400));
  }

  const token = await user.getJwtToken();

  sendToken(token, 200, res);
});

const userLogout = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      message: "Logout successfully",
    });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new errorHandler("User Not Found", 404));
  }

  const token = await user.getPassResetToken();
  user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  const message = await passwordResetMailTemplate(user?.name, resetUrl);

  try {
    sendMail({
      email: user?.email,
      subject: "Password Reset - ECOM",
      message,
    });

    res.status(200).json({
      message: "Mail Sent Successfully",
    });
  } catch (error) {
    user.resetTokenExpire = undefined;
    user.resetTokenExpire = undefined;

    user.save();

    return next(error.message, 500);
  }
});
const resetPasswordVerify = catchAsyncError(async (req, res, next) => {
  const passResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const result = await userModel.findOne({
    passResetToken,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!result) {
    next(new errorHandler("Password Token Not Exists", 404));
  }
  if (result) {
    res.status(200).json({
      tokenExists: true,
    });
  }
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const passResetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    passResetToken,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new errorHandler("Invaild Token Id", 404));
  }

  if (password !== confirmPassword) {
    return next(
      new errorHandler("Password & Confirm Password Didn't Match", 400)
    );
  }

  try {
    user.password = password;
    user.resetTokenExpire = undefined;
    user.passResetToken = undefined;
    user.save();
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    return next(error.message, 500);
  }
});

const getProfile = catchAsyncError(async (req, res, next) => {
  const _id = req.user._id;
  const user = await userModel.findById(_id);

  if (!user) {
    return next("Token Expired Please Login Again", 401);
  }

  res.status(200).json({
    user,
  });
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, password, confirmPassword } = req.body;
  const _id = req.user._id;
  if (password !== confirmPassword) {
    return next(
      new errorHandler("Password And Confirm Password Didn't Match", 401)
    );
  }
  const user = await userModel.findById({ _id }).select("+password");

  if (!user) {
    return next(new errorHandler("Token Expired Please Login Again", 401));
  }
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new errorHandler("Old Password Didn't Match", 400));
  }

  user.password = password;
  user.save();
  res.status(200).json({
    message: "Password Changed Successfully",
  });
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, phone_no } = req.body;
  const _id = req.user._id;
  const user = await userModel.findByIdAndUpdate(_id, {
    name,
    email,
    phone_no,
  });

  if (!user) {
    return next("Token Expired Please Login Again", 401);
  }
  user.save();
  res.status(200).json({
    message: "Profile Updated Successfully",
  });
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({ users });
});

const getUserDetail = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const user = await userModel.findById(_id);

  if (!user) {
    return next("User Not Found With This Id", 404);
  }

  res.status(200).json({
    user,
  });
});

const updateUserDetail = catchAsyncError(async (req, res, next) => {
  const { name, email, phone_no } = req.body;
  const _id = req.params.id;
  const user = await userModel.findByIdAndUpdate(_id, {
    name,
    email,
    phone_no,
  });

  if (!user) {
    return next("User Not Found With This Id", 404);
  }
  user.save();
  res.status(200).json({
    message: "Detail Changed Successfully",
  });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
  const _id = req.params.id;
  const user = await userModel.findByIdAndDelete(_id);

  if (!user) {
    return next("User Not Found With This Id", 404);
  }
  if(user?.avatar.public_id){
   await delete_file(user?.avatar.public_id)
  }

  res.status(200).json({
    message: "User Deleted Successfully",
  });
});

const uploadAvatar = catchAsyncError(async (req, res, next) => {
  const avatar = await upload_file(req.body.avatar, "/ecom/avatars");
  const _id = req.user._id;

  const user = await userModel.findByIdAndUpdate(_id, { avatar });

  if (!user) {
    return next("User Not Found With This Id", 404);
  }

  res.status(200).json(user);
});

export {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  getProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetail,
  updateUserDetail,
  deleteUser,
  uploadAvatar,
  resetPasswordVerify,
};
