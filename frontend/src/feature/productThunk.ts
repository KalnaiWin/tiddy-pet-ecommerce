import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { ProductInfo } from "../types/InterfaceProduct";

export const getAllProducts = createAsyncThunk<
  ProductInfo[],
  { page: number; limit: number; name: string },
  { rejectValue: string }
>(
  "store/getAllProducts",
  async ({ page, limit, name }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/product", {
        params: {
          page,
          limit,
          name,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);
