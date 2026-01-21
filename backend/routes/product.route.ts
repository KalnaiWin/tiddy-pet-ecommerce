import express from "express";
import {
  addNewProduct,
  DeleteProduct,
  EditProduct,
  getAllBrands,
  getAllCategories,
  getAllProducts,
  getProductDetail,
} from "../controller/product.controller.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.get("/", arcjetProtection, getAllProducts);
router.get("/category", arcjetProtection, getAllCategories);
router.get("/brand", arcjetProtection, getAllBrands);
router.get("/view/:id", arcjetProtection, getProductDetail);
router.post(
  "/add",
  authorizeJWT,
  arcjetProtection,
  authorizeRole("ADMIN"),
  addNewProduct,
);
router.put(
  "/edit/:id",
  authorizeJWT,
  arcjetProtection,
  authorizeRole("ADMIN"),
  EditProduct,
);
router.delete(
  "/delete/:id",
  authorizeJWT,
  arcjetProtection,
  authorizeRole("ADMIN"),
  DeleteProduct,
);

export default router;
