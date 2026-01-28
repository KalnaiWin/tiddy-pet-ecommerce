import { ArrowUp, Download, Plus, Trash, XIcon } from "lucide-react";
import StackedAreaChart from "./chart/StackedAreaChart";
// import { useState } from "react";
import PieChartWithPaddingAngle from "./chart/PieChartWithPaddingAngle";
import BarChartWithCustomizedEvent from "./chart/BarChartWithCustomizedEvent";
import TopPerformanceProduct from "./chart/TopPerformanceProduct";
import CurrentPayment from "./chart/CurrentPayment";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useRef, useState } from "react";
import { getTotalRevenueOrder } from "../../feature/orderThunk";
import { formatVND, getVoucherStatus } from "../../types/HelperFunction";
import { deleteVoucher, getAllVouchers } from "../../feature/voucherThunk";
import FormCreateVoucher from "./FormCreateVoucher";

interface OrderStatic {
  todayRevenue: number;
  previousRevenue: number;
  percentageRevenue: number;
  todayOrder: number;
  previousOrder: number;
  percentageOrder: number;
}

const AnalyticTable = () => {
  const { revenue, revenueStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const { vouchers, status } = useSelector((state: RootState) => state.voucher);

  const dispatch = useDispatch<AppDispatch>();
  const [createVoucher, setCreateVoucher] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllVouchers());
    }
  }, [vouchers, status]);

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

  useEffect(() => {
    if (revenueStatus === "idle") {
      dispatch(getTotalRevenueOrder({ time: "day" }));
    }
  }, [dispatch, revenueStatus]);

  let orderStatic: OrderStatic = {
    todayRevenue: 0,
    previousRevenue: 0,
    percentageRevenue: 0,
    todayOrder: 0,
    previousOrder: 0,
    percentageOrder: 0,
  };

  const today = new Date().getDate();

  for (const total of revenue) {
    if (Number(total.label.slice(0, 2)) !== today) {
      orderStatic.previousRevenue += total.revenue;
    } else {
      orderStatic.todayRevenue += total.revenue + orderStatic.previousRevenue;
      orderStatic.percentageRevenue = Math.round(
        (orderStatic.previousRevenue / orderStatic.todayRevenue) * 100,
      );
    }
  }

  for (const total of revenue) {
    if (Number(total.label.slice(0, 2)) !== today) {
      orderStatic.previousOrder += total.totalOrder;
    } else {
      orderStatic.todayOrder += total.totalOrder + orderStatic.previousOrder;
      orderStatic.percentageOrder = Math.round(
        (orderStatic.previousOrder / orderStatic.todayOrder) * 100,
      );
    }
  }

  const formCreate = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-col p-5 bg-slate-200 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Analytics Overview</h1>
          <p className="text-slate-600">Check what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex gap-2 items-center text-white bg-orange-500 rounded-md h-fit py-1.5 px-3 font-medium">
            <Download /> Export CSV
          </button>
          <button
            className="flex gap-2 items-center text-orange-700 bg-orange-100 rounded-md h-fit py-1.5 px-3 font-medium cursor-pointer hover:opacity-80"
            onClick={() => setCreateVoucher(true)}
            disabled={vouchers.length > 10}
          >
            <Plus /> Create Voucher
          </button>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-2 w-full gap-2">
        <div className="flex flex-col bg-white p-3 rounded-md my-5 w-full">
          <h1 className="uppercase text-slate-700">Total Revenue</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">
              {formatVND(orderStatic.todayRevenue)}
            </p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> {orderStatic.percentageRevenue}%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
        <div className="flex flex-col bg-white p-3 rounded-md my-5 w-full">
          <h1 className="uppercase text-slate-700">Total Order</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-semibold">
              {formatVND(orderStatic.todayOrder)}
            </p>
            <p className="flex bg-green-100 text-green-600 py-0.5 px-1 text-xs rounded-md items-center">
              <ArrowUp className="size-4" /> {orderStatic.percentageOrder}%
            </p>
          </div>
          <p className="text-slate-400 text-xs font-medium">date.now</p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <StackedAreaChart />
        <div className="flex xl:flex-row flex-col justify-between gap-5 my-10 xl:h-64">
          <div className="xl:w-2/3 w-full">
            <PieChartWithPaddingAngle />
          </div>
          <div className="xl:w-1/2 w-full flex flex-col justify-center items-center bg-white py-5 rounded-xl">
            <h1>Payment Gateway Performance</h1>
            <div className="w-full">
              <BarChartWithCustomizedEvent />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 xl:flex-row flex-col">
        <div className="xl:w-2/3 w-full">
          <TopPerformanceProduct />
        </div>
        <div className="xl:w-1/3 w-full">
          <CurrentPayment />
        </div>
      </div>
      <div className="w-full bg-slate-100 flex flex-col p-5 relative">
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
        <div className="mt-6 rounded-md p-4">
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
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
                        key={voucher._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">
                          {voucher.code}
                        </td>

                        <td className="px-4 py-3 font-bold">
                          {voucher.discount}%
                        </td>

                        <td className="px-4 py-3">
                          {new Date(
                            voucher.validDay.dateFrom,
                          ).toLocaleDateString("vi-VN")}
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
                        <td className="px-4 py-3">
                          <Trash
                            className="text-red-600 bg-red-200 rounded-md p-1 size-8"
                            onClick={() => {
                              dispatch(
                                deleteVoucher({
                                  voucherId: voucher._id,
                                }),
                              );
                              console.log(voucher._id);
                            }}
                          />
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
    </div>
  );
};

export default AnalyticTable;
