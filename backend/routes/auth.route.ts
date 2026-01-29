import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  loginUser,
  logoutUser,
  refreshAcessToken,
  registerUser,
} from "../controller/auth.controller.js";
import { authorizeJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/refresh-token", refreshAcessToken);
router.post("/logout", authorizeJWT, logoutUser);

export default router;
