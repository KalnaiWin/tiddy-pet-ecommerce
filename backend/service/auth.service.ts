import bcrypt from "bcryptjs";
import type {
  authLoginInterface,
  authRegisterInterface,
} from "../interface/auth.interface.js";
import { authRepository } from "../repository/auth.repository.js";
import { authRegisterForm } from "../model/auth.model.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { ENV } from "../config/env.js";

export const authService = {
  register: async (data: authRegisterInterface) => {
    const { name, email, password, role } = data;
    if (!["CUSTOMER", "SHIPPER"].includes(role)) {
      // validate role
      throw new Error("This role is not existed");
    }
    if (password.length < 6)
      // validate password
      throw new Error("The length of password should be at least 6.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // validate email
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    let newRole = role;
    for (const emailAdmin of ENV.EMAIL_ADMIN.split(";")) {
      if (emailAdmin === email) {
        newRole = "ADMIN";
      }
    }
    const existingUser = await authRepository.findUserByEmail(email); // check exsited user
    if (existingUser) {
      throw new Error("This email has been already used.");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const infoNewUser = authRegisterForm.parse({
      name,
      email,
      password: hashedPassword,
      role: newRole,
    });

    const newUser = await authRepository.createAccount(infoNewUser);

    return newUser;
  },

  login: async (data: authLoginInterface) => {
    const { email, password } = data;

    const exsitingUser = await authRepository.findUserByEmail(email);
    if (!exsitingUser) throw new Error("User is not exsiting");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      exsitingUser.password,
    );
    if (!isPasswordCorrect) throw new Error("Invalid password");

    return exsitingUser;
  },

  refreshNewAccessToken: async (refreshToken: string) => {
    if (!refreshToken) throw new Error("Missing refresh token");
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) throw new Error("Invalid token");
    const newAccessToken = signAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });
    const newRefreshToken = signRefreshToken({
      userId: decoded.userId,
      role: decoded.role,
    });
    return { newAccessToken, newRefreshToken };
  },
};
