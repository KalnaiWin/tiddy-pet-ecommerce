import express from "express"
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT } from "../middleware/auth.middleware.js";
import { changeStatusAccount, getAllShippers, getAllUsers, verifyAccountShipper } from "../controller/account.controller.js";


const router = express.Router();

router.use(authorizeJWT, arcjetProtection);

router.get("/user", getAllUsers);
router.get("/shipper", getAllShippers);
router.put("/change/:id", changeStatusAccount);
router.put("/verify/:id", verifyAccountShipper);

export default router;