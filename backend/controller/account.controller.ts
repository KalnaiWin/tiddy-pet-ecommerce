import type { Request, Response } from "express";
import User from "../schema/user.schema.js";
import {
  changeStatusResponse,
  lisShipperInfo,
  listUserInfoResponse,
  verifyStatusShipperResponse,
} from "../model/account.model.js";
import { AccountService } from "../service/account.service.js";
import { ZodError } from "zod";

export const getAllUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const email = String(req.query.email) || "";
  try {
    const users = await AccountService.getAllCustomer(page, limit, email);
    const allUsers = listUserInfoResponse.parse(users);
    if (!allUsers)
      return res
        .status(400)
        .json({ message: "Have something wrong with list users" });
    return res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getAllShippers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const email = String(req.query.email) || "";
  try {
    const users = await AccountService.getAllShipper(page, limit, email);
    const allUsers = lisShipperInfo.parse(users);
    if (!allUsers)
      return res
        .status(400)
        .json({ message: "Have something wrong with list users" });
    return res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const changeStatusAccount = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id: userId } = req.params;
  try {
    if (!userId) return res.status(404).json({ message: "Id not found" });
    const user = await AccountService.changeStatusAccount(status, userId);
    const changed = changeStatusResponse.parse(user);
    return res.status(200).json(changed);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const verifyAccountShipper = async (req: Request, res: Response) => {
  const { verification_status } = req.body;
  const { id: userId } = req.params;
  try {
    if (!userId) return res.status(404).json({ message: "Id not found" });
    const user = await AccountService.verifyAccountShipper(
      verification_status,
      userId
    );

    const changed = verifyStatusShipperResponse.parse(user);

    return res.status(200).json(changed);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
