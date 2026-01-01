import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { ProductState } from "../types/InterfaceProduct";
import { getAllProducts } from "../feature/productThunk";

const initialState: ProductState = {
  products: null,
  status: "idle",
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addMatcher(isPending(getAllProducts), (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addMatcher(isFulfilled(getAllProducts), (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
        state.error = null;
      })

      .addMatcher(isRejected(getAllProducts), (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
