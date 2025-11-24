'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { AttendanceRecord } from '@/types';

interface AttendanceChartProps {
  data: AttendanceRecord[];
  color?: string;
}

export default function AttendanceChart({ data, color = '#3b82f6' }: AttendanceChartProps) {
  const chartData = data.map(record => ({
    month: record.date,
    count: record.count,
    total: record.total,
    rate: record.total ? Math.round((record.count / record.total) * 100) : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={2}
          name="출석 인원"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="rate"
          stroke="#10b981"
          strokeWidth={2}
          name="출석률 (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
