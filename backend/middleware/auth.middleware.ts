import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { authRepository } from "../repository/auth.repository.js";

export const authorizeJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyAccessToken(accessToken);
    const user = await authRepository.findUserById(decoded.userId.toString());
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protecteRoute middleware: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;

    if (user?.role !== role) {
      return res.status(403).json({
        message: "Access denied. You do not have the right permissions",
      });
    }
    next();
  };
};
