import express from "express";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/auth.controller.js";
import { authorizeJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", authorizeJWT, logoutUser);
router.get("/", authorizeJWT, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
