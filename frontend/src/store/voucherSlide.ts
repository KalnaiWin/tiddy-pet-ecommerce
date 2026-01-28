import { createSlice } from "@reduxjs/toolkit";
import type { InitailVoucherState } from "../types/InterfaceVoucher";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
} from "../feature/voucherThunk";

const initialState: InitailVoucherState = {
  vouchers: [],
  status: "idle",
  creatingStatus: "idle",
};

export const voucherSlide = createSlice({
  name: "voucher",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // ================ DELETE VOUCHERS ================
    builder
      .addCase(deleteVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers.filter((id) => id._id === action.payload._id);
      })
      .addCase(deleteVoucher.rejected, (state) => {
        state.status = "failed";
      });

    // ================ GET ALL VOUCHERS ================
    builder
      .addCase(getAllVouchers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVouchers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload;
      })
      .addCase(getAllVouchers.rejected, (state) => {
        state.status = "failed";
      });

    // ================ CREATE VOUCHERS ================
    builder
      .addCase(createVoucher.pending, (state) => {
        state.creatingStatus = "loading";
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.creatingStatus = "succeeded";
        state.vouchers.push(action.payload);
      })
      .addCase(createVoucher.rejected, (state) => {
        state.creatingStatus = "failed";
      });
  },
});

export default voucherSlide.reducer;
