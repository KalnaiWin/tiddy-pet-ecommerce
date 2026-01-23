import type { Request, Response } from "express";
import { AnalyticService } from "../service/analytic.service.js";

export const getPreviousNumberOfRevenue = async (
  req: Request,
  res: Response,
) => {
  const { time } = req.body;
  try {
    const result = await AnalyticService.getPreviousDataOfRevenue(time);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getPreviousProductSold = async (req: Request, res: Response) => {
  try {
    const result = await AnalyticService.getPreviousDataOfProduct();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getStatusPaymentMethod = async (req: Request, res: Response) => {};

// export const getPreviousCustomer = async (req: Request, res: Response) => {};
