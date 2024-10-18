import React from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const LIGHT_COLORS = ['#0088FE', '#007825'];
const DARK_COLORS = ['#0088FE', '#00C49F'];


interface MyDonutChartProps {
  data: { name: string; value: number }[];
}

const MyDonutChart: React.FC<MyDonutChartProps> = ({ data }) => {
  
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';
  const COLORS = isLightTheme ? LIGHT_COLORS : DARK_COLORS;

  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  const chartData = data.length === 0 ? [{ name: 'No Data', value: 0 }] : data;

  return (
    <PieChart width={500} height={500}>
      <Pie
        data={chartData}
        cx="50%" 
        cy="50%" 
        innerRadius={80} 
        outerRadius={150} 
        fill="#8884d8"
        dataKey="value"
        label={({ value }) => `$${value.toLocaleString()}`}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        wrapperStyle={{ fontSize: '17px', marginTop: '0px' }}
        formatter={(value, entry) => {
          const percentage = totalValue === 0 ? 0 : ((entry.payload.value / totalValue) * 100).toFixed(0);
          return `${value}: ${percentage}%`;
        }}
      />
    </PieChart>
  );
};

export default MyDonutChart;