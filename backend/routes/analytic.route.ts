import express from "express";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  getOrderStatusDistribution,
  getPreviousNumberOfRevenue,
  getPreviousProductSold,
} from "../controller/analytic.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection, authorizeRole("ADMIN"));

router.get("/revenue/:time", getPreviousNumberOfRevenue);
router.get("/product", getPreviousProductSold);
router.get("/order-status", getOrderStatusDistribution);

export default router;
