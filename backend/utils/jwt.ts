import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import type { Response } from "express";

export interface UserPayload {
  userId: string;
  role: string;
<<<<<<< HEAD
=======
  sessionId: string;
>>>>>>> 88ca4dc (style: navbar and connect backend authentication function)
}

export const generateToken = (payload: UserPayload, res: Response) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const verifyToken = (token: string): UserPayload => {
  return jwt.verify(token, ENV.JWT_SECRET!) as UserPayload;
};
