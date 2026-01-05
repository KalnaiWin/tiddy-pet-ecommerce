import { createSlice } from "@reduxjs/toolkit";
import type { ProductState } from "../types/InterfaceProduct";
import {
  createNewProduct,
  deleteProduct,
  getAllBrands,
  getAllCategories,
  getAllProducts,
  viewProductDetail,
} from "../feature/productThunk";

const initialState: ProductState = {
  products: null,
  status: "idle",
  error: "",

  categories: null,
  categoriesStatus: "idle",

  brands: null,
  brandsStatus: "idle",

  creatingStatus: "idle",
  deletingStaus: "idle",

  detail: null,
  detailStatus: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetDeleteStatus(state) {
      state.deletingStaus = "idle";
    },
  },

  extraReducers(builder) {
    // ================== VIEW PRODUCT DETAIL ==================

    builder
      .addCase(viewProductDetail.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(viewProductDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.detailStatus = "succeeded";
      })
      .addCase(viewProductDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.error = action.payload as string;
      });

    // ================== DELETE PRODUCT ==================
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deletingStaus = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deletingStaus = "succeeded";
        if (state.products) {
          state.products = state.products.filter(
            (p) => p._id !== action.meta.arg.id
          );
        }
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.creatingStatus = "failed";
      });

    // ================== CREATE NEW PRODUCT ==================
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.creatingStatus = "loading";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.creatingStatus = "succeeded";
        if (!state.products) {
          state.products = [action.payload];
        } else {
          state.products.push(action.payload);
        }
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.creatingStatus = "failed";
        state.error = action.payload as string;
      });

    // ================== GET ALL CATEGORIES USED ==================
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = "succeeded";
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.error = action.payload as string;
      });

    // ================== GET ALL BRANDS USED ==================
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.brandsStatus = "loading";
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.brandsStatus = "succeeded";
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.brandsStatus = "failed";
        state.error = action.payload as string;
      });

    // ================== GET ALL PRODUCTS CREATED ==================
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteStatus } = productSlice.actions;
export default productSlice.reducer;
