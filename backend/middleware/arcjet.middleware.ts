import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../config/arcjet.js";
import type { NextFunction, Request, Response } from "express";
import type { ArcjetNodeRequest } from "@arcjet/node";

export const arcjetProtection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || "0.0.0.0";
    const decision = await aj.protect(req as ArcjetNodeRequest, { ip });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy" });
      }
    }
    if (decision.results.some(isSpoofedBot)) {
      return res.status(429).json({
        error: "Spoofed bot detacted",
        message: "Malicious bot activity detected.",
      });
    }
    next();
  } catch (error) {
    console.log("Arcjet Protections Error: ", error);
    next();
  }
};
