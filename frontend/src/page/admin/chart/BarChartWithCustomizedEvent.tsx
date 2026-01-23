import { Bar, BarChart, XAxis, type BarRectangleItem } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const data = [
  {
    name: "Stripe",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
];

const BarChartWithCustomizedEvent = () => {
  return (
    <>
      <BarChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "200px",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
      >
        <XAxis dataKey={"name"} />
        <Bar
          dataKey="uv"
          onClick={(bri: BarRectangleItem, index, event) => {
            console.log("clicked on", bri, index, event);
          }}
          fill="#ff7300"
          className="bg-[#ff7300]"
        />
        <RechartsDevtools />
      </BarChart>
    </>
  );
};

export default BarChartWithCustomizedEvent;
