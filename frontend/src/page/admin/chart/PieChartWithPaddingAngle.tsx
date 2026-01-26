import { Pie, PieChart } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useEffect, useMemo } from "react";
import { getStatusOrderDistribution } from "../../../feature/orderThunk";
import { fillColorStatusOrder } from "../../../types/HelperFunction";

export default function PieChartWithPaddingAngle() {
  const { orderStatusDis, distributionStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (distributionStatus === "idle") {
      dispatch(getStatusOrderDistribution());
    }
  }, [dispatch, orderStatusDis]);

  const pieData = useMemo(() => {
    if (!orderStatusDis) return [];
    return Object.entries(orderStatusDis).map(([status, count]) => ({
      name: status,
      value: count,
      fill: fillColorStatusOrder(status),
    }));
  }, []);

  return (
    <div className="flex flex-col w-full bg-white rounded-md px-5 min-h-full">
      <h1 className="w-full font-extrabold py-4 px-5">
        Order Status Distribution
      </h1>
      <div className="flex w-full pr-10 gap-10 items-center">
        <PieChart
          style={{
            width: "60%",
            maxWidth: "200px",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={pieData}
            innerRadius="60%"
            outerRadius="100%"
            fill="#8884d8"
            dataKey="value"
          />
          <RechartsDevtools />
        </PieChart>
        <div className="grid grid-cols-2 gap-y-2 gap-x-10 w-full">
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full" />
              Delivered
            </div>
            <p className="font-semibold">{orderStatusDis?.DELIVERED}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-600 rounded-full" />
              Shipping
            </div>
            <p className="font-semibold">{orderStatusDis?.SHIPPING}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full" />
              Picking
            </div>
            <p className="font-semibold">{orderStatusDis?.PICKING}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              Assigned
            </div>
            <p className="font-semibold">{orderStatusDis?.ASSIGNED}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
              Confirmed
            </div>
            <p className="font-semibold">{orderStatusDis?.CONFIRMED}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              Pending
            </div>
            <p className="font-semibold">{orderStatusDis?.PENDING}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              Failed
            </div>
            <p className="font-semibold">{orderStatusDis?.FAILED}</p>
          </div>
          <div className="flex justify-between w-28 text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-700 rounded-full" />
              Cancelled
            </div>
            <p className="font-semibold">{orderStatusDis?.CANCELLED}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
