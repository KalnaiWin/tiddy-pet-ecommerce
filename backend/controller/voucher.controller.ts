import type { Request, Response } from "express";
import { InputVoucher } from "../model/voucher.model.js";
import { ZodError } from "zod";
import { VoucherService } from "../service/voucher.service.js";

export const createVoucher = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const validInput = InputVoucher.parse(data);
    const result = await VoucherService.createVoucher(validInput);
    return res.status(201).json(result);
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

export const getAllVouchers = async (req: Request, res: Response) => {
  try {
    const result = await VoucherService.getAllVouchers();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const deletVoucher = async (req: Request, res: Response) => {
  const { id: voucherId } = req.params;
  try {
    if (!voucherId)
      return res.status(404).json({ message: "VoucherId not found" });
    const result = await VoucherService.deleteVoucher(voucherId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
