import express from "express";
import {
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
} from "../controllers/authController.js";
import { isAuthorized, authorizedRole } from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/auth/register", userRegister);
router.post("/auth/login", userLogin);
router.get("/auth/logout", isAuthorized, userLogout);
router.put("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/password/verify/:token", resetPasswordVerify);

router.get("/profile/", isAuthorized, getProfile);
router.put("/profile/password", isAuthorized, updatePassword);
router.put("/profile/update", isAuthorized, updateProfile);
router.put("/profile/avatar", isAuthorized, uploadAvatar);

router.get("/admin/user/", isAuthorized, authorizedRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthorized, authorizedRole("admin"),getUserDetail)
  .put(isAuthorized, authorizedRole("admin"),updateUserDetail)
  .delete(isAuthorized, authorizedRole("admin"),deleteUser);



export default router;
