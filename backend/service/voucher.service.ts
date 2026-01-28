import type { DataInputVoucher } from "../interface/voucher.interface.js";
import Voucher from "../schema/voucher.schema.js";

export const VoucherService = {
  createVoucher: async (data: DataInputVoucher) => {
    const totalVoucher = (await Voucher.find({})).length;
    if (totalVoucher >= 10) throw new Error("Max voucher total is 10");
    const { dateFrom, dateTo } = data.validDay;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateFrom >= dateTo) {
      throw new Error("dateFrom must be before dateTo");
    }

    if (dateFrom < today) {
      throw new Error("dateFrom cannot be in the past");
    }

    const newVoucher = await Voucher.create(data);
    return newVoucher;
  },

  getAllVouchers: async () => {
    return await Voucher.find({});
  },

  deleteVoucher: async (voucherId: string) => {
    const exsitingVoucher = await Voucher.findByIdAndDelete(voucherId);
    if (!exsitingVoucher) throw new Error("Voucher not found");
    return exsitingVoucher;
  },
};
