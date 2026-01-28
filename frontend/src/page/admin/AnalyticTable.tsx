import { Download } from "lucide-react";
import StackedAreaChart from "./chart/StackedAreaChart";
// import { useState } from "react";
import PieChartWithPaddingAngle from "./chart/PieChartWithPaddingAngle";
import BarChartWithCustomizedEvent from "./chart/BarChartWithCustomizedEvent";
import TopPerformanceProduct from "./chart/TopPerformanceProduct";
import CurrentPayment from "./chart/CurrentPayment";

export const TimeRange = {
  TODAY: "Today",
  WEEK: "This Week",
  MONTH: "This Month",
  YEAR: "This Year",
} as const;

export type TimeRange = (typeof TimeRange)[keyof typeof TimeRange];

const AnalyticTable = () => {
  // const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.TODAY);

  return (
    <div className="flex flex-col p-5 bg-slate-200 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Analytics Overview</h1>
          <p className="text-slate-600">Check what's happening today.</p>
        </div>
        <button className="flex gap-2 items-center text-white bg-orange-500 rounded-md h-fit py-3 px-4 font-medium">
          <Download /> Export CSV
        </button>
      </div>
      <div className="flex flex-col mt-10">
        <StackedAreaChart />
        <div className="flex justify-between gap-5 my-10 h-64">
          <div className="w-2/3">
            <PieChartWithPaddingAngle />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center bg-white py-5 rounded-xl">
            <h1>Payment Gateway Performance</h1>
            <div className="w-full">
              <BarChartWithCustomizedEvent />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-2/3">
          <TopPerformanceProduct />
        </div>
        <div className="w-1/3">
          <CurrentPayment />
        </div>
      </div>
    </div>
  );
};

export default AnalyticTable;
