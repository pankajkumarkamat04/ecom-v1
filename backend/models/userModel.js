import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [50, "Name Cannot Exceed More Then 50 Character"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      select: false,
    },
    phone_no: {
      type: Number,
    },
    avatar: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },

    role: {
      type: String,
      default: "user",
    },
    passResetToken: {
      type: String,
    },
    resetTokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SCERET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.getPassResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("user", userSchema);
