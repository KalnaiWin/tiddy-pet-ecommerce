import Stripe from "stripe";
import { ENV } from "./env.js";

export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover",
});
