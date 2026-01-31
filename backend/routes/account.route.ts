import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT, authorizeRole } from "../middleware/auth.middleware.js";
import {
  deleteAccount,
  fetchUser,
  getAccountDetail,
  getAllShippers,
  getAllUsers,
  updateProfile,
  updateUserProfile,
} from "../controller/account.controller.js";

const router = express.Router();

router.get("/user", authorizeJWT, fetchUser);

router.use(authorizeJWT, arcjetProtection);

router.get("/customer", authorizeRole("ADMIN"), getAllUsers);
router.get("/shipper", authorizeRole("ADMIN"), getAllShippers);
router.get("/:id", authorizeRole("ADMIN"), getAccountDetail);

router.put("/update-profile/:id", authorizeRole("ADMIN"), updateProfile);
router.put("/update-profile", updateUserProfile);
router.delete("/delete/:id", authorizeRole("ADMIN"), deleteAccount);

export default router;
