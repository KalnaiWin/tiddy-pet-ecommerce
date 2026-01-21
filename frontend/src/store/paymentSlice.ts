import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart, verifySuccessfulPayment } from "../feature/paymentThunk";
import type { initialPayment } from "../types/InterfacePayment";

const initialState: initialPayment = {
  infoPayment: null,
  checkoutStatus: "idle",
  verifySuccessfull: "idle",
};

export const paymentSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},

  extraReducers(builder) {
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

    // ================= VERIFY PAYMENT =================
    builder
      .addCase(verifySuccessfulPayment.pending, (state) => {
        state.verifySuccessfull = "loading";
      })
      .addCase(verifySuccessfulPayment.fulfilled, (state, action) => {
        state.verifySuccessfull = "succeeded";
        state.infoPayment = action.payload;
      })
      .addCase(verifySuccessfulPayment.rejected, (state) => {
        state.verifySuccessfull = "failed";
      });
  },
});

export default paymentSlice.reducer;
