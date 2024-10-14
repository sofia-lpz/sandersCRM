import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { useDataProvider } from 'react-admin';
import { Box } from '@mui/material'; // Import Box for flex styling

const Dashboard: React.FC = () => {
  const dataProvider = useDataProvider();
  const [goal, setGoal] = useState(1000); // Default goal set to 1000
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dataProvider.getList('donaciones', {
      pagination: { page: 1, perPage: 100 }, // Adjust pagination as needed
      sort: { field: 'id', order: 'ASC' },
      filter: {},
    })
      .then(({ data }) => {
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
      if (!donation) return acc; // Check if donation is defined

      const type = donation.tipo ? donation.tipo.toLowerCase() : ''; // Safely access 'tipo'
      const quantity = donation.cantidad || 0; // Default to 0 if 'cantidad' is undefined

      // Aggregate donations by type
      if (type === 'digital') {
        acc.totalByType[0].value += quantity;
      } else if (type === 'efectivo') {
        acc.totalByType[1].value += quantity;
      }

      // For total donations over time
      const date = new Date(donation.fecha).toLocaleDateString();
      if (!acc.donationsOverTime[date]) {
        acc.donationsOverTime[date] = { date, total: 0 };
      }
      acc.donationsOverTime[date].total += quantity;

      // For campaign totals
      if (!acc.campaigns[donation.campana]) {
        acc.campaigns[donation.campana] = { name: donation.campana, value: 0 };
      }
      acc.campaigns[donation.campana].value += quantity;

      return acc;
    },
    {
      donationsOverTime: {},
      campaigns: {},
      totalByType: [
        { name: 'Digital', value: 0 },
        { name: 'Efectivo', value: 0 },
      ],
    }
  );

  const donationsOverTimeData = Object.values(processedData.donationsOverTime);
  const campaignData = Object.values(processedData.campaigns);

  // Calculate total donations
  const totalDonations = processedData.totalByType.reduce((acc, data) => acc + data.value, 0);

  // Colors for the pie charts
  const DIGITAL_EFECTIVO_COLORS = ['#094D92', '#053B06'];

  // Calculate how many times the goal has been crossed
  const timesGoalCrossed = Math.floor(totalDonations / goal);

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
              data={processedData.totalByType}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              dataKey="value"
              label
            >
              {processedData.totalByType.map((entry, index) => (
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
          style={{ marginBottom: '40px', marginTop: '20px', flexGrow: 1, width: 'auto' }}
          InputProps={{
            style: {
              width: `${goal.toString().length}ch` + 0.1, // Dynamic width based on input length
            },
          }}
        />

        {/* Total Goal Achievement Chart */}
       
        <Typography variant="h5">
          Cuantos sistemas se pueden construir: {timesGoalCrossed}
        </Typography>

        {/* Donations Over Time Line Chart */}
        <Typography variant="h5" style={{ marginTop: '40px' }}>Donaciones a lo largo del tiempo</Typography>
        <LineChart width={500} height={300} data={donationsOverTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>

        {/* Donations by Campaign Bar Chart */}
        <Typography variant="h5" style={{ marginTop: '40px' }}>Donaciones por Campaña</Typography>
        <BarChart width={500} height={300} data={campaignData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
