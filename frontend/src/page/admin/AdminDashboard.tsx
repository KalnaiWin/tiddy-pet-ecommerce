import { ArrowUp, Plus, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormCreateVoucher from "./FormCreateVoucher";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { getAllVouchers } from "../../feature/voucherThunk";
import { getVoucherStatus } from "../../types/HelperFunction";

const AdminDashboard = () => {
  const [createVoucher, setCreateVoucher] = useState(false);
  const { vouchers, status } = useSelector((state: RootState) => state.voucher);
  const dispatch = useDispatch<AppDispatch>();

  const formCreate = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllVouchers());
    }
  }, [vouchers]);
  console.log(vouchers);

  useEffect(() => {
    const handlClickOutSide = (event: MouseEvent) => {
      if (
        formCreate.current &&
        !formCreate.current.contains(event.target as Node)
      ) {
        setCreateVoucher(false);
      }
    };

    document.addEventListener("mousedown", handlClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handlClickOutSide);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col p-5 relative">
      {createVoucher && (
        <div className="absolute-center w-full h-full bg-black/30">
          <div
            className="absolute-center w-[60%] h-[50%] rounded-xl"
            ref={formCreate}
          >
            <XIcon
              className="absolute top-2 right-2 text-red-500 bg-red-100 rounded-full p-1 size-8 hover:bg-red-200"
              onClick={() => setCreateVoucher(false)}
            />
            <FormCreateVoucher />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Admin Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, Admin. Let's see what news today
          </p>
        </div>
        <button
          className="flex gap-2 items-center text-white bg-orange-500 rounded-md h-fit py-3 px-4 font-medium cursor-pointer hover:opacity-80"
          onClick={() => setCreateVoucher(true)}
          disabled={vouchers.length > 10}
        >
          <Plus /> Create Voucher
        </button>
      </div>
      {/* General Information */}
      <div className="grid md:grid-cols-5 gap-2 w-full my-5">
        <div className="flex flex-col bg-white p-3 rounded-md">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">$23.329.56</p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> 18%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-md">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">$23.329.56</p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> 18%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-md">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">$23.329.56</p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> 18%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-md">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">$23.329.56</p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> 18%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-md">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">$23.329.56</p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> 18%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-xl font-semibold mb-4">
          Current Vouchers (Max 10)
        </h1>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Discount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valid From
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Valid To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {vouchers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500 text-sm"
                  >
                    No vouchers found
                  </td>
                </tr>
              ) : (
                vouchers.map((voucher) => {
                  const status = getVoucherStatus(voucher);

                  return (
                    <tr
                      key={voucher.code}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">{voucher.code}</td>

                      <td className="px-4 py-3 font-bold">
                        {voucher.discount}%
                      </td>

                      <td className="px-4 py-3">
                        {new Date(voucher.validDay.dateFrom).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {new Date(voucher.validDay.dateTo).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
                      ${
                        status === "Active"
                          ? "bg-green-100 text-green-700"
                          : status === "Upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
