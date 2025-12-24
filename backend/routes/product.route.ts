import express from "express";
import {
  addNewProduct,
  DeleteProduct,
  EditProduct,
  getAllProducts,
} from "../controller/product.controller.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", getAllProducts);
router.post("/add", authorizeRole("ADMIN"), addNewProduct);
router.put("/edit/:id", authorizeRole("ADMIN"), EditProduct);
router.delete("/delete/:id", authorizeRole("ADMIN"), DeleteProduct);

export default router;
