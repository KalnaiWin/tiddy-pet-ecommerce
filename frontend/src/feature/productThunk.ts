import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type {
  CreateProductPayload,
  GetCategoryAndBrand,
  ProductInfo,
} from "../types/InterfaceProduct";

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

export const getAllCategories = createAsyncThunk<
  GetCategoryAndBrand[],
  void,
  { rejectValue: string }
>("store/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/product/category");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const getAllBrands = createAsyncThunk<
  GetCategoryAndBrand[],
  void,
  { rejectValue: string }
>("store/getAllBrands", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/product/brand");
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const createNewProduct = createAsyncThunk<
  ProductInfo,
  CreateProductPayload,
  { rejectValue: string }
>("store/createNewProduct", async (payload, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/product/add", payload);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});
