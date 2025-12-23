import type { Request, Response } from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { generateToken, type UserPayload } from "../utils/jwt.js";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields should be filled" });

    if (role !== "CUSTOMER" && role !== "ADMIN" && role != "SHIPPER")
      return res
        .status(400)
        .json({ message: "Error role. This role is not existed" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The length of password should be at least 6." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existUserWithThisEmail = await User.findOne({ email: email });
    if (existUserWithThisEmail)
      return res
        .status(400)
        .json({ message: "This email has been already used." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      const userPayLoad: UserPayload = {
        userId: savedUser.id,
        role: savedUser.role,
      };
      generateToken(userPayLoad, res);
      res.status(200).json(savedUser);
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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credential" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Creadentials" });
    const userPayLoad: UserPayload = {
      userId: user.id,
      role: user.role,
    };
    generateToken(userPayLoad, res);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully." });
};
