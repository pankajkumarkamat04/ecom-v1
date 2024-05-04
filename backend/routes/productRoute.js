import express from "express";
import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  getAllProduct,
  uploadProductImage,
  deleteProductImage,
} from "../controllers/productController.js";
import { authorizedRole, isAuthorized } from "../middleware/isAuthorized.js";
import {
  canReview,
  createReview,
  deleteReview,
  getReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.get("/product", getProduct);
router.get("/product/:id", getProductDetail);
router.post(
  "/admin/product",
  isAuthorized,
  authorizedRole("admin"),
  addProduct
);
router.put(
  "/admin/product/:id",
  isAuthorized,
  authorizedRole("admin"),
  updateProduct
);
router.put(
  "/admin/product/:id/upload_image",
  isAuthorized,
  authorizedRole("admin"),
  uploadProductImage
);
router.delete(
  "/admin/product/:id/delete_image",
  isAuthorized,
  authorizedRole("admin"),
  deleteProductImage
);
router.delete(
  "/admin/product/:id",
  isAuthorized,
  authorizedRole("admin"),
  deleteProduct
);
router.get(
  "/admin/products/",
  isAuthorized,
  authorizedRole("admin"),
  getAllProduct
);
router.post("/review/create", isAuthorized, createReview);
router.get("/review/:id", getReview);
router.get("/review/canreview/:id", isAuthorized, canReview);
router.delete(
  "/admin/review/:id",
  isAuthorized,
  authorizedRole("admin"),
  deleteReview
);
export default router;
