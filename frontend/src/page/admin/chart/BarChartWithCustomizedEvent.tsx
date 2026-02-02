import { Bar, BarChart, XAxis, type BarRectangleItem } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const data = [
  {
    name: "Stripe",
    uv: 4000,
  },
  {
    name: "Visa",
    uv: 3000,
  },
  {
    name: "Paypal",
    uv: 2000,
  },
  {
    name: "Momo",
    uv: 2780,
  },
  {
    name: "Zalo Pay",
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
