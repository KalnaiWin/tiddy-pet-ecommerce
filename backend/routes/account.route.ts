import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  deleteAccount,
  getAccountDetail,
  getAllShippers,
  getAllUsers,
  updateProfile,
} from "../controller/account.controller.js";

const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/user", authorizeRole("ADMIN"), getAllUsers);
router.get("/shipper", authorizeRole("ADMIN"), getAllShippers);
router.get("/:id", authorizeRole("ADMIN"), getAccountDetail);
router.put("/update-profile/:id", authorizeRole("ADMIN"), updateProfile);
router.delete("/delete/:id", authorizeRole("ADMIN"), deleteAccount);

export default router;
