import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "01/01", orders: 1, revenue: 200000 },
  { date: "02/01", orders: 5, revenue: 1200000 },
  { date: "03/01", orders: 2, revenue: 30000 },
  { date: "04/01", orders: 6, revenue: 750000 },
  { date: "05/01", orders: 9, revenue: 2000000 },
  { date: "06/01", orders: 3, revenue: 1500000 },
  { date: "07/01", orders: 1, revenue: 350000 },
];

export default function StackedAreaChart() {
  return (
    <div className="bg-white p-5 rounded-xl">
      <h1 className="flex justify-center w-full text-2xl font-semibold mb-10 text-green-600">
        Revenue and Orders
      </h1>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 40, left: 0, bottom: 20 }}
        >
          <XAxis
            dataKey="date"
            label={{ value: "Date", position: "bottom" }}
          />
          <YAxis
            yAxisId="orders"
            orientation="left"
            allowDecimals={false}
            label={{
              value: "Orders",
              angle: -90,
              position: "outside",
            }}
          />
          <YAxis
            yAxisId="revenue"
            orientation="right"
            tickFormatter={(v) => `${v / 1000}k`}
            label={{
              value: "Revenue",
              angle: 90,
              position: "right",
            }}
          />
          <Tooltip />
          <Bar yAxisId="orders" dataKey="orders" name="Orders" barSize={24} />
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
