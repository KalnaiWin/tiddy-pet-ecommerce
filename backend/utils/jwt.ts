import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import type { Request, Response } from "express";

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

export const refreshAcessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) throw new Error("Missing refresh token");

  const decoded = verifyRefreshToken(refreshToken);

  if (!decoded) throw new Error("Invalid token");

  const newAccessToken = jwt.sign(
    {
      userId: decoded.userId,
      role: decoded.role,
    },
    ENV.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  res.status(200).json({ accessToken: newAccessToken });
};
