import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { InputVoucher, Vouchers } from "../types/InterfaceVoucher";
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
  InputVoucher,
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

export const deleteVoucher = createAsyncThunk<
  Vouchers,
  { voucherId: string },
  { rejectValue: string }
>("voucher/deleteVoucher", async ({ voucherId }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete(`/voucher/delete/${voucherId}`);
    toast.success("Deleted successfully");
    return res.data;
  } catch (error: any) {
    toast.error("Deleted failed");
    return rejectWithValue(
      error.response?.data?.message || "Delete vouchers failed",
    );
  }
});
