import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MyDateChartProps {
  data: { month: string; ingresos: number }[];
}

const DateChart: React.FC<MyDateChartProps> = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const axisColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? '#333' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';
  const gridColor = isDarkMode ? '#444' : '#ccc';
  const lineColor = isDarkMode ? '#00D7C9' : '#007BFF';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="month" stroke={axisColor} />
        <YAxis stroke={axisColor} />
        <Tooltip 
          contentStyle={{ backgroundColor, color: textColor }} 
          itemStyle={{ color: textColor }} 
          formatter={(value) => [`Ingresos: $${value.toLocaleString()}`, '']} 
          labelFormatter={(label) => `Mes: ${label}`}
        />
        <Legend 
          layout="horizontal"
          align="center"
          verticalAlign="top"
          wrapperStyle={{ paddingBottom: 20, color: textColor }} 
        />
        <Line type="monotone" dataKey="ingresos" stroke={lineColor} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DateChart;