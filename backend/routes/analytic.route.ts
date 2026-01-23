import express from "express";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  getPreviousNumberOfRevenue,
  getPreviousProductSold,
} from "../controller/analytic.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection, authorizeRole("ADMIN"));

router.get("/revenue", getPreviousNumberOfRevenue);
router.get("/product", getPreviousProductSold);

export default router;
