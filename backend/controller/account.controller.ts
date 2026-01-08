import type { Request, Response } from "express";
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

export const getAccountDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Id not found" });
    const user = await AccountService.getSpecificAccount(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
    else return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "This id not found" });
    const deletedAccount = await AccountService.deleteAccount(id);
    if (!deletedAccount)
      return res.status(404).json({ message: "Deleted failed" });
    return res.status(200).json({ message: "Deleted succesfully" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
    else return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!id) return res.status(404).json({ message: "This id not found" });
    const result = await AccountService.updateProfile(id, data);
    if (!result) return res.status(400).json({ message: "Updated failed" });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
    else return res.status(500).json({ message: "Internal Server Error" });
  }
};
