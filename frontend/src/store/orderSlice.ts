import { createSlice } from "@reduxjs/toolkit";
import type { initialOrder } from "../types/InterfaceOrder";
import { getAllOrders } from "../feature/orderThunk";

const initialState: initialOrder = {
  orders: [],
  status: "idle",
};

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default orderSlice.reducer;
