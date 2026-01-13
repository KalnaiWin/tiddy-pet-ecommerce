import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartItem, CartRequestInput } from "../types/InterfaceCart";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const addItemToCart = createAsyncThunk<
  CartItem[],
  CartRequestInput,
  { rejectValue: string }
>("cart/addToCart", async (data: CartRequestInput, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/cart/add", data);
    toast.success("Add successfully");
    return res.data;
  } catch (error: any) {
    toast.error("Add failed");
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const deleteItemFromCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("cart/deleteItemFromCart", async (productId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/cart/remove/${productId}`);
    toast.success("Deleted successfully");
    return productId;
  } catch (error: any) {
    toast.error("Deleted failed");
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const getAllItemsFromCart = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/getAllItemsFromoCart", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/cart");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});
