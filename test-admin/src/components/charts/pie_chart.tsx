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

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  // If there is no data, set a default value
  const chartData = data.length === 0 ? [{ name: 'No Data', value: 0 }] : data;

  return (
    <PieChart width={500} height={500}>
      <Pie
        data={chartData}
        cx="50%" // Center horizontally
        cy="50%" // Center vertically
        innerRadius={80}  // Add innerRadius to make it a donut chart
        outerRadius={150}  // Increased outerRadius for larger chart
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
        wrapperStyle={{ fontSize: '17px', marginTop: '0px' }} // Increased font size and moved closer
        formatter={(value, entry) => {
          const percentage = totalValue === 0 ? 0 : ((entry.payload.value / totalValue) * 100).toFixed(0);
          return `${value}: ${percentage}%`;
        }}
      />
    </PieChart>
  );
};

export default MyDonutChart;