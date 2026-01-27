import { createSlice } from "@reduxjs/toolkit";
import type { InitailVoucherState } from "../types/InterfaceVoucher";
import { createVoucher, getAllVouchers } from "../feature/voucherThunk";

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

    // ================ GET ALL VOUCHERS ================
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
