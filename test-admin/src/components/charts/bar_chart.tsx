import React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MyBarChartProps {
  data: { campana: string; ingresos: number }[];
}

const MyBarChart: React.FC<MyBarChartProps> = ({ data }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const axisColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? '#333' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';
  const gridColor = isDarkMode ? '#444' : '#ccc';
  const barColor = isDarkMode ? '#00D7C9' : '#007BFF';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout='vertical'>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis type="number" dataKey="ingresos" stroke={axisColor} />
        <YAxis type="category" dataKey="campana" width={150} stroke={axisColor} />
        <Tooltip 
          contentStyle={{ backgroundColor, color: textColor }} 
          itemStyle={{ color: textColor }} 
          formatter={(value) => [`Ingresos: $${value.toLocaleString()}`, '']} 
          labelFormatter={(label) => `Campaña: ${label}`}
        />
        <Legend 
          layout="horizontal"
          align="center"
          verticalAlign="top"
          wrapperStyle={{ paddingBottom: 20, color: textColor }} 
          formatter={(value) => {
            if (value === 'ingresos') {
              return 'Ingresos';
            }
            return value;
          }}
        />
        <Bar dataKey="ingresos" fill={barColor} label="Ingresos" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;