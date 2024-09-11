import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const Chart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis /> {/* Removed dataKey, YAxis doesn't need it */}
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="total" fill="#2563eb" />
        </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
