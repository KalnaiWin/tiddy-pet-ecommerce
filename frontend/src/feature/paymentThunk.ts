import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type { CheckOut } from "../types/InterfaceOrder";
import type { InfoPayment } from "../types/InterfacePayment";

export const checkoutCart = createAsyncThunk<
  string,
  CheckOut,
  { rejectValue: string }
>("payment/checkoutCart", async (data: CheckOut, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/payment/checkout", data);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const verifySuccessfulPayment = createAsyncThunk<
  InfoPayment,
  string,
  { rejectValue: string }
>("payment/verifySuccessfulPayment", async (sessionId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(
      `/payment/successfull?session_id=${sessionId}`,
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Payment verification failed",
    );
  }
});
