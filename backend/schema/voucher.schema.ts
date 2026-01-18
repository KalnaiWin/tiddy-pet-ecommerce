import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    uppercase: true,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  validDay: {
    dateFrom: {
      type: Date,
      default: null,
    },
    dateTo: {
      type: Date,
      default: null,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);
export default Voucher;
