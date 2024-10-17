import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

interface MyDonutChartProps {
  data: { name: string; value: number }[];
}

const MyDonutChart: React.FC<MyDonutChartProps> = ({ data }) => {
  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <PieChart width={500} height={500}>
      <Pie
        data={data}
        cx="50%" // Center horizontally
        cy="50%" // Center vertically
        innerRadius={80}  // Add innerRadius to make it a donut chart
        outerRadius={150}  // Increased outerRadius for larger chart
        fill="#8884d8"
        dataKey="value"
        label={({ value }) => `$${value.toLocaleString()}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        wrapperStyle={{ fontSize: '17px', marginTop: '0px' }} // Increased font size and moved closer
        formatter={(value, entry) => {
          const percentage = ((entry.payload.value / totalValue) * 100).toFixed(0);
          return `${value}: ${percentage}%`;
        }}
      />
    </PieChart>
  );
};

export default MyDonutChart;
