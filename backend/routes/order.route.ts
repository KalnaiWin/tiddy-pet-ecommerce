import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getAllOrderForAdmin,
  getAllOrderForCustomer,
  getAllOrderForShipper,
} from "../controller/order.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);


router.post("/create", createOrder);

//  Admin permission
router.get("/admin", authorizeRole("ADMIN"), getAllOrderForAdmin);

//  User permission
router.get("/customer", authorizeRole("CUSTOMER"), getAllOrderForCustomer);

//  Shipper permission
router.get("/shipper", authorizeRole("SHIPPER"), getAllOrderForShipper);


export default router;
