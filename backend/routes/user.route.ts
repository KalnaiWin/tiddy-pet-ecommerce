import express from "express"
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { authorizeJWT } from "../middleware/auth.middleware.js";


const router = express.Router();

router.use(authorizeJWT, arcjetProtection);



export default router;