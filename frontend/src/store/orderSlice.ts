import { createSlice } from "@reduxjs/toolkit";
import type { initialOrder } from "../types/InterfaceOrder";
import { getAllOrdersForAdmin } from "../feature/orderThunk";

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
  },
});

export default orderSlice.reducer;
