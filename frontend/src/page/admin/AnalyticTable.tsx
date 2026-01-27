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
      {/* <div className="flex items-center bg-slate-100 p-1 rounded-lg w-fit mt-5">
        {Object.values(TimeRange).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              timeRange === range
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {range}
          </button>
        ))}
      </div> */}
      {/* General information */}
      {/* <div className="grid md:grid-cols-5 gap-2 w-full my-5">
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
      </div> */}
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
