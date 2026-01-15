import { createSlice } from "@reduxjs/toolkit";
import type { CartState } from "../types/InterfaceCart";
import {
  addItemToCart,
  deleteItemFromCart,
  getAllItemsFromCart,
} from "../feature/cartThunk";

const initialState: CartState = {
  cartItems: null,
  cartArray: [],
  status: "idle",
  deletingStatus: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetStatusCart(state) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    // =========== ADD ITEM TO CART ===========
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartArray = action.payload;
      })
      .addCase(addItemToCart.rejected, (state) => {
        state.status = "failed";
      });

    // =========== GET ALL ITEMS FROM CART ===========
    builder
      .addCase(getAllItemsFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllItemsFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartArray = action.payload;
      })
      .addCase(getAllItemsFromCart.rejected, (state) => {
        state.status = "failed";
      });

    // =========== DELETED ITEMS FROM CART ===========
    builder
      .addCase(deleteItemFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartArray = state.cartArray.filter(
          (item) => item.variantId !== action.payload
        );
      })
      .addCase(deleteItemFromCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetStatusCart } = cartSlice.actions;
export default cartSlice.reducer;
