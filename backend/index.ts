import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

<<<<<<< HEAD
app.use("/auth", authRoute);
=======
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
>>>>>>> 88ca4dc (style: navbar and connect backend authentication function)

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*splat", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log("Server running on port: ", ENV.PORT);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  });
