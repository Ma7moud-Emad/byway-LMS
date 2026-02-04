"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";

export default function StudentsGrowthChart({
  chartData,
}: {
  chartData: { month: string; totalStudents: number }[];
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Student Growth Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
          <XAxis
            dataKey="month"
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Students", angle: -90, position: "insideLeft" }}
          />
          <Tooltip formatter={(value) => `${value} Students`} />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="totalStudents"
            name="Total Students"
            stroke="#4f46e5"
            fill="#c7d2fe"
            strokeWidth={2}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
