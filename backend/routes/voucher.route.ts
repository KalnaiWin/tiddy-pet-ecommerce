import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  createVoucher,
  deletVoucher,
  getAllVouchers,
} from "../controller/voucher.controller.js";

const router = express.Router();

router.use(authorizeJWT, authorizeRole("ADMIN"), arcjetProtection);

router.get("/", getAllVouchers);
router.post("/create", createVoucher);
router.delete("/delete/:id", deletVoucher);

export default router;
