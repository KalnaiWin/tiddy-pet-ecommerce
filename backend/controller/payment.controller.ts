import type { Request, Response } from "express";
import { PaymentService } from "../service/payment.service.js";

export const checkoutOrder = async (req: Request, res: Response) => {
  const items = req.body;
  try {
    const result = await PaymentService.checkoutOrder(items);
    if (result) res.status(200).json(result);
    else res.status(400).json({ message: "Paid failed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const verifySuccessfulPayment = async (req: Request, res: Response) => {
  const { session_id } = req.query;
  try {
    const result = await PaymentService.verifySuccessfulPayment(
      String(session_id),
    );

    if (result) return res.status(200).json(result);
    return res.status(400).json({ success: false });
  } catch (error: any) {
    res.status(500).json({ success: false });
  }
};
