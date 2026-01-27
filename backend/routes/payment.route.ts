import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT } from "../middleware/auth.middleware.js";
import {
  checkoutOrder,
  verifySuccessfulPayment,
} from "../controller/payment.controller.js";

const router = express.Router();

// router.use();

router.post("/checkout/:id", authorizeJWT, arcjetProtection, checkoutOrder);
router.get("/successfull", verifySuccessfulPayment);

export default router;
