import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useDataProvider } from 'react-admin';

const Dashboard: React.FC = () => {
  const dataProvider = useDataProvider();
  const [goal, setGoal] = useState(1000); // Default goal set to 1000
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dataProvider.getDashboardData()
      .then(data => {
        setDonationData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [dataProvider]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Process the data to get totals for each type
  const processedData = donationData.reduce(
    (acc, donation) => {
      const type = donation.name.toLowerCase();
      const quantity = donation.value;

      if (type === 'digital') {
        acc[0].value += quantity;
      } else if (type === 'efectivo') {
        acc[1].value += quantity;
      }

      return acc;
    },
    [
      { name: 'Digital', value: 0 },
      { name: 'Efectivo', value: 0 }
    ]
  );

  // Calculate total donations
  const totalDonations = processedData.reduce((acc, data) => acc + data.value, 0);

  // Colors for the pie charts
  const DIGITAL_EFECTIVO_COLORS = ['#094D92', '#053B06'];
  const BLUE_COLOR = '#094D92';
const GREEN_color = '#053B06';

  // Calculate how many times the goal has been crossed
  const timesGoalCrossed = Math.floor(totalDonations / goal);
  const digitalTimesGoalCrossed = Math.floor(processedData[0].value / goal);
  const efectivoTimesGoalCrossed = Math.floor(processedData[1].value / goal);

  // Calculate data for pie charts
  const goalData = [
    { name: 'Achieved', value: totalDonations % goal },
    { name: 'Remaining', value: Math.max(goal - (totalDonations % goal), 0) },
  ];

  const digitalGoalData = [
    { name: 'Achieved', value: processedData[0].value % goal },
    { name: 'Remaining', value: Math.max(goal - (processedData[0].value % goal), 0) },
  ];

  const efectivoGoalData = [
    { name: 'Achieved', value: processedData[1].value % goal },
    { name: 'Remaining', value: Math.max(goal - (processedData[1].value % goal), 0) },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Total de Donaciones</Typography>
        {/* Digital and Efectivo Donations Chart */}
        <PieChart width={400} height={300}>
          <Pie
            data={processedData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={DIGITAL_EFECTIVO_COLORS[index % DIGITAL_EFECTIVO_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Costo de Sistema de filtrado de agua
        </Typography>
        <TextField
          type="number"
          label="Costo"
          variant="outlined"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          style={{ marginBottom: '20px', marginTop: '10px' }}
        />

        {/* Total Goal Achievement Chart */}
        <Typography variant="h5">Porcentaje de dinero recaudado para un sistema</Typography>
        <Typography variant="body1">
          Cuantos sistemas se pueden construir: {timesGoalCrossed}
        </Typography>
        <PieChart width={400} height={300}>
          <Pie
            data={goalData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
            fill={BLUE_COLOR}
          >
            {goalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? BLUE_COLOR : '#ffffff'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Digital Donations Goal Achievement Chart */}
        <Typography variant="h5">Porcentaje de dinero recaudado para un sistema (digital)</Typography>
        <Typography variant="body1">
          Cuantos sistemas se pueden construir: {digitalTimesGoalCrossed}
        </Typography>
        <PieChart width={400} height={300}>
          <Pie
            data={digitalGoalData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
            fill={BLUE_COLOR}
          >
            {digitalGoalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? BLUE_COLOR : '#ffffff'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Efectivo Donations Goal Achievement Chart */}
        <Typography variant="h5">Porcentaje de dinero recaudado para un sistema (efectivo)</Typography>
        <Typography variant="body1">
          Cuantos sistemas se pueden construir: {efectivoTimesGoalCrossed}
        </Typography>
        <PieChart width={400} height={300}>
          <Pie
            data={efectivoGoalData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            label
            fill={GREEN_color}
          >
            {efectivoGoalData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? GREEN_color : '#ffffff'} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
