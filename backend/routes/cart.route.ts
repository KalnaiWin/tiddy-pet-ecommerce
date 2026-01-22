import express from "express";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  addToCart,
  getAllProductsFromCart,
  removeFromCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", authorizeRole("CUSTOMER"), getAllProductsFromCart);
router.post("/add", authorizeRole("CUSTOMER"), addToCart);
router.delete("/remove/:id", authorizeRole("CUSTOMER"), removeFromCart);

export default router;
