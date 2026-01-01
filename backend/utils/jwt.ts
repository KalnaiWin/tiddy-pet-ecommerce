import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import type { Response } from "express";

export interface UserPayload {
  userId: string;
  role: "CUSTOMER" | "ADMIN" | "SHIPPER";
}

export const generateToken = (payload: UserPayload, res: Response) => {
  if (!ENV.JWT_ACCESS_SECRET || !ENV.JWT_REFRESH_SECRET)
    throw new Error("JWT_SECRET is not defined");

  const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return accessToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET) as UserPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error("Access token expired");
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid access token");
    }
    throw err;
  }
};

export const verifyRefreshToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as UserPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error("Refresh token expired");
    }

    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid refresh token");
    }
    throw err;
  }
};

export const signAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
