import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../controller/product.controller.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", getAllProducts);
router.post("/add", authorizeRole("ADMIN"), addNewProduct);
// router.put("/update");
// router.delete("/delete");

export default router;
