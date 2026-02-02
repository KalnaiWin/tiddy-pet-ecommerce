import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { createVoucher } from "../../feature/voucherThunk";

const FormCreateVoucher = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    validDay: {
      dateFrom: "",
      dateTo: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createVoucher(formData));
  };

  return (
    <div className="p-5 bg-white rounded-xl h-full w-full md:text-sm text-xs">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Create New Voucher</h1>
        <p className="">Define your discount campaign details</p>
      </div>
      <form
        className="grid grid-cols-2 mt-5 gap-2 space-x-10 space-y-5 relative pb-18"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-gray-700">
            Voucher Code
          </label>
          <div className="flex gap-2 text-sm">
            <input
              type="text"
              placeholder="SUMMER25"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-md font-semibold text-gray-700">
            Discount (%)
          </label>
          <div className="flex gap-2 text-sm">
            <input
              type="number"
              placeholder="20(%)"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.discount !== 0 ? formData.discount : ""}
              onChange={(e) =>
                setFormData({ ...formData, discount: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-gray-700">From</label>
          <div className="flex gap-2 text-sm">
            <input
              type="date"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.validDay.dateFrom}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validDay: {
                    ...formData.validDay,
                    dateFrom: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-gray-700">To</label>
          <div className="flex gap-2 text-sm">
            <input
              type="date"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={formData.validDay.dateTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  validDay: {
                    ...formData.validDay,
                    dateTo: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <button
          className="mt-5 flex w-full justify-center bg-orange-500 p-3 rounded-md text-white font-bold absolute bottom-0"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormCreateVoucher;
