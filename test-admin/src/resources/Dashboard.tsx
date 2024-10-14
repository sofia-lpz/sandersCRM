import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useDataProvider } from 'react-admin';
import { Box } from '@mui/material'; // Import Box for flex styling

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

  // Calculate how many times the goal has been crossed
  const timesGoalCrossed = Math.floor(totalDonations / goal);

  // Calculate data for pie charts
  const goalData = [
    { name: 'Achieved', value: totalDonations % goal },
    { name: 'Remaining', value: Math.max(goal - (totalDonations % goal), 0) },
  ];

  return (
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: '20px' }}>Total de Donaciones</Typography>

        {/* Display total donations above the pie chart */}
        <Typography variant="h6" style={{ marginBottom: '20px' }}>
          Total Recaudado: ${totalDonations}
        </Typography>
        
        {/* Digital and Efectivo Donations Chart */}
        <Box display="flex" justifyContent="center" flexGrow={1} width="100%">
          <PieChart width={400} height={400} style={{ flexGrow: 1 }}>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              dataKey="value"
              label
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={DIGITAL_EFECTIVO_COLORS[index % DIGITAL_EFECTIVO_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>

        <Typography variant="h6" style={{ marginTop: '40px' }}>
          Costo de Sistema de filtrado de agua
        </Typography>
        <TextField
          type="number"
          label="Costo"
          variant="outlined"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          style={{ marginBottom: '40px', marginTop: '40px', flexGrow: 1, width: 'auto' }} // Flex width with auto size
          InputProps={{
            style: {
              width: `${goal.toString().length}ch` + 0.1, // Dynamic width based on input length
            },
          }}
        />

        {/* Total Goal Achievement Chart */}
        <Typography variant="h5">Porcentaje de dinero recaudado para un sistema</Typography>
        <Typography variant="body1">
          Cuantos sistemas se pueden construir: {timesGoalCrossed}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
