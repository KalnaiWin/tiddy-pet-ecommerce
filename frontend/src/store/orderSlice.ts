import { createSlice } from "@reduxjs/toolkit";
import type { initialOrder } from "../types/InterfaceOrder";
import {
  cancelOrder,
  dropShipperSelected,
  getAllOrders,
  getSpecificOrderForAdmin,
  getStatusOrderDistribution,
  getTotalRevenueOrder,
  selectShipperForOrder,
} from "../feature/orderThunk";

const initialState: initialOrder = {
  orders: [],
  ordersDetailAdmin: null,
  status: "idle",

  orderStatusDis: null,
  distributionStatus: "idle",

  revenue: [],
  revenueStatus: "idle",
};

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers(builder) {
    // ============ CANCEL ORDERS  ============
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(cancelOrder.rejected, (state) => {
        state.status = "failed";
      });

    // ============ GET TOTAL ORDER REVENUE  ============
    builder
      .addCase(getTotalRevenueOrder.pending, (state) => {
        state.revenueStatus = "loading";
      })
      .addCase(getTotalRevenueOrder.fulfilled, (state, action) => {
        state.revenueStatus = "succeeded";
        state.revenue = action.payload;
      })
      .addCase(getTotalRevenueOrder.rejected, (state) => {
        state.revenueStatus = "failed";
      });

    // ============ GET ORDER STATUS DISTRIBUTION  ============
    builder
      .addCase(getStatusOrderDistribution.pending, (state) => {
        state.distributionStatus = "loading";
      })
      .addCase(getStatusOrderDistribution.fulfilled, (state, action) => {
        state.distributionStatus = "succeeded";
        state.orderStatusDis = action.payload;
      })
      .addCase(getStatusOrderDistribution.rejected, (state) => {
        state.distributionStatus = "failed";
      });

    // ============ DROP SHIPPER SELECTED  ============
    builder
      .addCase(dropShipperSelected.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dropShipperSelected.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordersDetailAdmin = action.payload;
      })
      .addCase(dropShipperSelected.rejected, (state) => {
        state.status = "failed";
      });

    // ============ SELECT SHIPPER FOR ORDER  ============
    builder
      .addCase(selectShipperForOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectShipperForOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordersDetailAdmin = action.payload;
      })
      .addCase(selectShipperForOrder.rejected, (state) => {
        state.status = "failed";
      });

    // ============ GET ORDER DETAIL FOR ADMIN  ============
    builder
      .addCase(getSpecificOrderForAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSpecificOrderForAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ordersDetailAdmin = action.payload;
      })
      .addCase(getSpecificOrderForAdmin.rejected, (state) => {
        state.status = "failed";
        state.ordersDetailAdmin = null;
      });

    // ============ GET ALL ORDERS ============
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
