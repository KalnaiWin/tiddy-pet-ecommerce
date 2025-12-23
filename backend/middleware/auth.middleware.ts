import type { NextFunction, Request, Response } from "express";
import User from "../model/User.js";
import { verifyToken } from "../utils/jwt.js";

export const authorizeJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId).select("-password");
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

export const authorizeRole = async (role: string) => {
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
