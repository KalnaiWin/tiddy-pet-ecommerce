import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import type { User, UserInfo } from "../types/InterfaceUser";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth");
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const registerUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string; role: string },
  { rejectValue: string }
>("user/registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    toast.success("Register successfully. Greeting !");
    return res.data;
  } catch (error: any) {
    toast.error("Register failed");
    return rejectWithValue(error.response?.data);
  }
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success("Login successfully. Welcome back !");
    return res.data;
  } catch (error: any) {
    toast.error("Login failed");
    return rejectWithValue(error.response?.data);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logout successfully. See you later !");
    } catch (error: any) {
      toast.error("Logout failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllUsers = createAsyncThunk<
  UserInfo[],
  { page: number; limit: number; email?: string },
  { rejectValue: string }
>(
  "account/getAllUsers",
  async ({ page, limit, email }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/account/user`, {
        params: {
          page,
          limit,
          email,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Cannot fetch users");
    }
  }
);

export const getAllShippers = createAsyncThunk<
  UserInfo[],
  { page: number; limit: number; email?: string },
  { rejectValue: string }
>(
  "account/getAllShippers",
  async ({ page, limit, email }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/account/shipper`, {
        params: {
          page,
          limit,
          email,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue("Cannot fetch users");
    }
  }
);
