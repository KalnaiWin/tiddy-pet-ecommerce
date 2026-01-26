import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type {
  OrderCreateInput,
  OrderCreateOutput,
  OrderDetailsForAdmin,
  OrderInfo,
  OrderStatusDistribution,
  RevenueTime,
} from "../types/InterfaceOrder";
import toast from "react-hot-toast";

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

export const getSpecificOrderForAdmin = createAsyncThunk<
  OrderDetailsForAdmin,
  { id: string },
  { rejectValue: string }
>("order/getSpecificOrderForAdmin", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/order/${id}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

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

export const selectShipperForOrder = createAsyncThunk<
  OrderDetailsForAdmin,
  { orderId: string; shipperId: string },
  { rejectValue: string }
>(
  "order/selectShipperForOrder",
  async ({ orderId, shipperId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/order/select/${orderId}`, {
        shipperId,
      });
      if (res) {
        toast.success("Choose successfully");
        return res.data;
      } else {
        toast.error("Choose failed");
      }
    } catch (error: any) {
      toast.error("Choose failed");
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

export const dropShipperSelected = createAsyncThunk<
  OrderDetailsForAdmin,
  { orderId: string },
  { rejectValue: string }
>("order/dropShipperSelected", async ({ orderId }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.delete(`/order/drop-shipper/${orderId}`);
    if (res) {
      toast.success("Drop successfully");
      return res.data;
    } else {
      toast.error("Drop failed");
    }
  } catch (error: any) {
    toast.error("Drop failed");
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const getStatusOrderDistribution = createAsyncThunk<
  OrderStatusDistribution,
  void,
  { rejectValue: string }
>("order/getStatusOrderDistribution", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/analytic/order-status");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const getTotalRevenueOrder = createAsyncThunk<
  RevenueTime[],
  { time: string },
  { rejectValue: string }
>("order/getTotalRevenueOrder", async ({ time }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/analytic/revenue/${time}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});
