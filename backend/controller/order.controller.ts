import type { Request, Response } from "express";
import { OrderService } from "../service/order.service.js";
import { ZodError } from "zod";
import { CreateOrderInputSchema } from "../model/order.model.js";

export const getAllOrders = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = String(req.query.search) || "";
  const status = String(req.query.status) || "";
  const payment = String(req.query.payment) || "";
  try {
    const result = await OrderService.getAllOrdersForRole(userId, {
      page,
      limit,
      search,
      status,
      payment,
    });
    console.log(result);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  try {
    const validatedInput = CreateOrderInputSchema.parse(req.body);
    const result = await OrderService.createNewOrder(userId, validatedInput);
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
