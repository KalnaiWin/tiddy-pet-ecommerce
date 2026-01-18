import { createSlice } from "@reduxjs/toolkit";
import type { initialOrder } from "../types/InterfaceOrder";
import { checkoutCart, getAllOrdersForAdmin } from "../feature/orderThunk";

const initialState: initialOrder = {
  orders: [],
  status: "idle",
  checkoutStatus: "idle",
};

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.status = "failed";
      });

    // ================= CHECKOUT CART =================
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.checkoutStatus = "loading";
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.checkoutStatus = "succeeded";
      })
      .addCase(checkoutCart.rejected, (state) => {
        state.checkoutStatus = "failed";
      });
  },
});

export default orderSlice.reducer;
