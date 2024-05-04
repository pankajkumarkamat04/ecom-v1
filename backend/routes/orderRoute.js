import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getAllUsersOrder,
  getOrder,
  getSales,
  updateOrder,
} from "../controllers/orderController.js";
import { authorizedRole, isAuthorized } from "../middleware/isAuthorized.js";
const router = express.Router();

router.post("/order/new", isAuthorized, createOrder);
router.get("/order/myorder", isAuthorized, getAllOrder);
router.get("/order/:id", isAuthorized, getOrder);
router.get(
  "/admin/order/",
  isAuthorized,
  authorizedRole("admin"),
  getAllUsersOrder
);
router.put(
  "/admin/order/:id",
  isAuthorized,
  authorizedRole("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthorized,
  authorizedRole("admin"),
  deleteOrder
);
router.get(
  "/admin/order/getsalesdata",
  isAuthorized,
  authorizedRole("admin"),
  getSales
);

export default router;
