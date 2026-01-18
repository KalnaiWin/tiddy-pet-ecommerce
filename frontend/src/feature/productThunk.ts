import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import type {
  CreateProductPayload,
  EditProductPayload,
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
  },
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

export const editProduct = createAsyncThunk<
  ProductInfo,
  EditProductPayload,
  { rejectValue: string }
>("store/editProduct", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.put(`/product/edit/${id}`, data);
    return {
      ...res.data,
      _id: id,
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Error");
  }
});

export const deleteProduct = createAsyncThunk<
  boolean,
  { id: string },
  { rejectValue: string }
>("store/deleteProduct", async ({ id }, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/product/delete/${id}`);
    return true;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Delete product failed",
    );
  }
});

export const viewProductDetail = createAsyncThunk<
  ProductInfo,
  { id: string },
  { rejectValue: string }
>("store/viewProductDetail", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/product/view/${id}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Delete product failed",
    );
  }
});
