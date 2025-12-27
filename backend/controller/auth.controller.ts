import type { Request, Response } from "express";
import { generateToken, type UserPayload } from "../utils/jwt.js";
import { userAuthResponse } from "../model/user.model.js";
import { authService } from "../service/auth.service.js";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields should be filled" });

    const newUser = await authService.register(req.body);

    if (newUser) {
      const userPayLoad: UserPayload = {
        userId: newUser.id,
        role: newUser.role,
      };
      generateToken(userPayLoad, res);
      const response = userAuthResponse.parse(newUser);
      res.status(200).json(response);
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const oldUser = await authService.login(req.body);

    const userPayLoad: UserPayload = {
      userId: oldUser.id,
      role: oldUser.role,
    };

    generateToken(userPayLoad, res);
    const response = userAuthResponse.parse(oldUser);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res.clearCookie("access_token", cookieOptions);
  res.clearCookie("refresh_token", cookieOptions);

  res.status(200).json({ message: "Logged out successfully" });
};
