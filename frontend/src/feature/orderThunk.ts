import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { OrderInfo } from "../types/InterfaceOrder";

export const getAllOrdersForAdmin = createAsyncThunk<
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
  "order/getAllOrdersForAdmin",
  async ({ page, limit, search, status, payment }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/order/admin", {
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
