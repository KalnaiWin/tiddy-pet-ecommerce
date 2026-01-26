import type { Request, Response } from "express";
import { AnalyticService } from "../service/analytic.service.js";

export const getPreviousNumberOfRevenue = async (
  req: Request,
  res: Response,
) => {
  const { time } = req.params;
  try {
    if (time !== "day" && time !== "week" && time !== "month")
      return res.status(400).json({ message: "Invalid date time" });
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

export const getOrderStatusDistribution = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await AnalyticService.getOrderStatusDistribution();
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
