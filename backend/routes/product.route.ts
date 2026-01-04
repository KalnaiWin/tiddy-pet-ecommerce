import express from "express";
import {
  addNewProduct,
  DeleteProduct,
  EditProduct,
  getAllBrands,
  getAllCategories,
  getAllProducts,
} from "../controller/product.controller.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", getAllProducts);
router.get("/category", getAllCategories);
router.get("/brand", getAllBrands);
router.post("/add", authorizeRole("ADMIN"), addNewProduct);
router.put("/edit/:id", authorizeRole("ADMIN"), EditProduct);
router.delete("/delete/:id", authorizeRole("ADMIN"), DeleteProduct);

export default router;
