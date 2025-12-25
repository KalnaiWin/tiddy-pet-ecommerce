import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import type { User } from "../types/InterfaceUser";

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
      toast.error("Logout successfully. See you later !");
    } catch (error: any) {
      toast.error("Logout failed");
      return rejectWithValue(error.response?.data);
    }
  }
);
