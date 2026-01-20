import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
} from "../controller/order.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.post("/create", createOrder);

//  Admin permission
router.get("/", getAllOrders);

//  User permission

//  Shipper permission

export default router;
