'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BudgetRecord } from '@/types';

interface BudgetChartProps {
  data: BudgetRecord[];
  color?: string;
}

export default function BudgetChart({ data, color = '#3b82f6' }: BudgetChartProps) {
  const chartData = data.map(record => ({
    year: record.year.toString(),
    allocated: Math.round(record.allocated / 10000), // 만원 단위
    spent: Math.round(record.spent / 10000),
    remaining: Math.round((record.allocated - record.spent) / 10000),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip formatter={(value) => `${value}만원`} />
        <Legend />
        <Bar dataKey="allocated" fill="#94a3b8" name="할당 예산" />
        <Bar dataKey="spent" fill={color} name="집행 예산" />
      </BarChart>
    </ResponsiveContainer>
  );
}
