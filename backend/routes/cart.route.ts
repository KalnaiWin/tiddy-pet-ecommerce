import express from "express";
import { authorizeJWT } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  addToCart,
  getAllProductsFromCart,
  removeFromCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", getAllProductsFromCart);
router.post("/add", addToCart);
router.delete("/remove/:id", removeFromCart);

export default router;
