import { Pie, PieChart } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const data = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#ff0000" },
  { name: "Group D", value: 200, fill: "#FF8042" },
  { name: "Group D", value: 200, fill: "#033345" },
];

export default function PieChartWithPaddingAngle({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "200px",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        innerRadius="60%"
        outerRadius="100%"
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
      />
      <RechartsDevtools />
    </PieChart>
  );
}
