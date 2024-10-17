import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MyDateChartProps {
  data: { month: string; value: number }[];
}

const DateChart: React.FC<MyDateChartProps> = ({ data }) => {
  const theme = useTheme();
  const axisColor = theme.palette.mode === 'dark' ? 'white' : 'black';

  // Map full month names to abbreviated forms
  const abbreviatedData = data.map(item => {
    const monthAbbreviations: { [key: string]: string } = {
      'Enero': 'Ene',
      'Febrero': 'Feb',
      'Marzo': 'Mar',
      'Abril': 'Abr',
      'Mayo': 'May',
      'Junio': 'Jun',
      'Julio': 'Jul',
      'Agosto': 'Ago',
      'Septiembre': 'Sep',
      'Octubre': 'Oct',
      'Noviembre': 'Nov',
      'Diciembre': 'Dic'
    };
    return { ...item, month: monthAbbreviations[item.month] || item.month };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={abbreviatedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          stroke={axisColor} 
          interval={0} 
          angle={-90} 
          textAnchor="end" 
          dx={-5} 
        />
        <YAxis 
          stroke={axisColor} 
          tickFormatter={(value) => `$${value.toLocaleString()}`} 
        />
        <Tooltip 
          itemStyle={{ backgroundColor: 'white', color: 'black' }} 
          formatter={(value) => `$${value.toLocaleString()}`} 
          labelFormatter={(label) => `Mes: ${label}`}
        />
        <Legend 
          layout="horizontal"
          align="center"
          verticalAlign="top"
          wrapperStyle={{ paddingBottom: 20 }} // Add padding to move the legend further away
          formatter={(value) => {
            if (value === 'value') {
              return 'Ingresos';
            }
            return value;
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#00D7C9" activeDot={{ r: 10 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DateChart;