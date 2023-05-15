import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles/ChartsComp.css";

const data = [
  {
    name: "Texnika",
    Texnika: 4000,
    Sport: 2400,
    Dress: 2400,
  },
  {
    name: "Sport",
    Sport: 3000,
    Texnika: 1398,
    Dress: 2210,
  },
  {
    name: "Dress",
    Dress: 2000,
    Texnika: 9800,
    Sport: 2290,
  },
  {
    name: "Dress2",
    Texnika: 2780,
    Sport: 3908,
    Dress: 2000,
  },
];

export default function ChartsComp() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={50}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Texnika" fill="#F2994A" background={{ fill: "#eee" }} />
        <Bar dataKey="Sport" fill="#2F80ED" />
        <Bar dataKey="Dress" fill="#9B51E0" />
      </BarChart>
    </ResponsiveContainer>
  );
}
