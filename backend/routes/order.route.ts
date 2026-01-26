import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  createOrder,
  dropShipperSelected,
  getAllOrders,
  getSpecificOrderForAdmin,
  selectShipperDelivery,
} from "../controller/order.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.post("/create", createOrder);
router.get("/", getAllOrders);

//  Admin permission
router.get("/:id", authorizeRole("ADMIN"), getSpecificOrderForAdmin);
router.put("/select/:id", authorizeRole("ADMIN"), selectShipperDelivery);
router.delete("/drop-shipper/:id", authorizeRole("ADMIN"), dropShipperSelected);
router.put("/assign/:id", authorizeRole("ADMIN"));
//  User permission

//  Shipper permission

export default router;
