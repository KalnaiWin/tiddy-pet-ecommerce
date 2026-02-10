import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import accountRoute from "./routes/account.route.js";
import orderRoute from "./routes/order.route.js";
import cartRoute from "./routes/cart.route.js";
import paymentRoute from "./routes/payment.route.js";
import analyticRoute from "./routes/analytic.route.js";
import voucherRoute from "./routes/voucher.route.js";
import { initRedis } from "./config/redis.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/account", accountRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/analytic", analyticRoute);
app.use("/api/voucher", voucherRoute);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*splat", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// exception error handler global

connectDB()
  .then(async () => {
    await initRedis();
    app.listen(ENV.PORT);
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
