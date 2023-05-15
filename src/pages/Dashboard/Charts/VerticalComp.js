import React, { PureComponent } from "react";
import {
  BarChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Kraska",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Mix",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Kabel",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Bolg’a",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Shurf",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
];
export default function VerticalComp() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={8} fill="#2F80ED" />
        <Line dataKey="uv" stroke="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
}
