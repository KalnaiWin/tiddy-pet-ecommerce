import { useDispatch, useSelector } from "react-redux";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AppDispatch, RootState } from "../../../store";
import { useEffect, useMemo } from "react";
import { getTotalRevenueOrder } from "../../../feature/orderThunk";
import { formatVND } from "../../../types/HelperFunction";

export default function StackedAreaChart() {
  const { revenue, revenueStatus } = useSelector(
    (state: RootState) => state.order,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (revenueStatus === "idle") {
      dispatch(getTotalRevenueOrder({ time: "day" }));
    }
  }, [revenue, dispatch]);

  const data = useMemo(() => {
    if (!revenue) return [];
    return revenue.map((item) => {
      const [day, month] = item.label.split("-");
      return {
        date: `${day}/${month}`,
        orders: item.totalOrder,
        revenue: item.revenue,
      };
    });
  }, [revenue]);

  console.log(revenue);

  return (
    <div className="bg-orange-50 p-5 rounded-xl">
      <h1 className="flex justify-center w-full text-2xl font-semibold mb-10 text-green-600">
        Revenue and Orders
      </h1>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 40, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="date" label={{ value: "Date", position: "bottom" }} />
          <YAxis
            yAxisId="revenue"
            orientation="right"
            tickFormatter={(v) => formatVND(v)}
            label={{
              value: "Revenue (VND)",
              angle: 90,
              position: "right",
            }}
          />
          <Tooltip />
          <Bar yAxisId="orders" dataKey="orders" name="Orders" barSize={24} color="#456789" />
          <Line
            yAxisId="revenue"
            dataKey="revenue"
            name="Revenue (VND)"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
