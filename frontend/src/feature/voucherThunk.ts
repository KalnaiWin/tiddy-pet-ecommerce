import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { Vouchers } from "../types/InterfaceVoucher";
import toast from "react-hot-toast";

export const getAllVouchers = createAsyncThunk<
  Vouchers[],
  void,
  { rejectValue: string }
>("voucher/getAllVouchers", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/voucher");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Get all vouchers failed",
    );
  }
});

export const createVoucher = createAsyncThunk<
  Vouchers,
  Vouchers,
  { rejectValue: string }
>("voucher/createVoucher", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/voucher/create", data);
    toast.success("Created successfully");
    return res.data;
  } catch (error: any) {
    toast.error("Created failed");
    return rejectWithValue(
      error.response?.data?.message || "Create vouchers failed",
    );
  }
});
