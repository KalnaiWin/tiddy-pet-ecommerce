import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type {
  OrderCreateInput,
  OrderCreateOutput,
  OrderInfo,
} from "../types/InterfaceOrder";

export const getAllOrders = createAsyncThunk<
  OrderInfo[],
  {
    page: number;
    limit: number;
    search: string;
    status: string;
    payment: string;
  },
  { rejectValue: string }
>(
  "order/getAllOrders",
  async ({ page, limit, search, status, payment }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order", {
        params: {
          page,
          limit,
          search,
          status,
          payment,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

export const createOrder = createAsyncThunk<
  OrderCreateOutput,
  OrderCreateInput,
  { rejectValue: string }
>("order/createOrder", async (data: OrderCreateInput, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/order/create", data);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});
