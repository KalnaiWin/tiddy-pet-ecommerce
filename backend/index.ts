import express from "express";
import { ENV } from "./config/env.ts";

const app = express();

app.listen(ENV.PORT, () => {
  console.log(`Server running on port: ${ENV.PORT}`);
});
