import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  cancelOrder,
  changeStatusOrder,
  createOrder,
  dropShipperSelected,
  getAllOrders,
  getOrderForShipper,
  getSpecificOrderForAdmin,
  selectShipperDelivery,
} from "../controller/order.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/", getAllOrders);

//  Shipper permission
router.get("/assign", authorizeRole("SHIPPER"), getOrderForShipper);

//  Admin permission
router.get("/:id", authorizeRole("ADMIN"), getSpecificOrderForAdmin);
router.put("/select/:id", authorizeRole("ADMIN"), selectShipperDelivery);
router.delete("/drop-shipper/:id", authorizeRole("ADMIN"), dropShipperSelected);

//  User permission
router.post("/create", authorizeRole("CUSTOMER"), createOrder);
router.put("/cancel/:id", authorizeRole("CUSTOMER"), cancelOrder);
router.post("/status/:id", changeStatusOrder);

export default router;
