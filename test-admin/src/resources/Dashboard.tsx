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
import { Box } from '@mui/material';

const Dashboard: React.FC = () => {
  const dataProvider = useDataProvider();
  const [goal, setGoal] = useState(1000); // Default goal set to 1000
  const [donationData, setDonationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dataProvider.getList('donaciones', {
      pagination: { page: 1, perPage: 100 },
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
      if (!donation) return acc;

      const type = donation.tipo ? donation.tipo.toLowerCase() : '';
      const quantity = donation.cantidad || 0;

      // Aggregate donations by type
      if (type === 'digital') {
        acc.totalByType[0].value += quantity;
      } else if (type === 'efectivo') {
        acc.totalByType[1].value += quantity;
      }

      const date = new Date(donation.fecha).toLocaleDateString();
      if (!acc.donationsOverTime[date]) {
        acc.donationsOverTime[date] = { date, total: 0 };
      }
      acc.donationsOverTime[date].total += quantity;

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

  const totalDonations = processedData.totalByType.reduce((acc, data) => acc + data.value, 0);
  const DIGITAL_EFECTIVO_COLORS = ['#094D92', '#053B06'];
  const timesGoalCrossed = Math.floor(totalDonations / goal);

  return (
<Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
  <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* Make the title focusable */}
    <Typography
      variant="h5"
      style={{ marginBottom: '20px' }}
      tabIndex={0}
      sx={{
        '&:focus': {
          backgroundColor: 'lightblue',
          outline: '2px solid blue',
        },
      }}
    >
      Total de Donaciones
    </Typography>

    {/* Display total donations above the pie chart */}
    <Typography
      variant="h6"
      style={{ marginBottom: '20px' }}
      tabIndex={0}
      sx={{
        '&:focus': {
          backgroundColor: 'lightblue',
          outline: '2px solid blue',
        },
      }}
    >
      Total Recaudado: ${totalDonations}
    </Typography>

    {/* Digital and Efectivo Donations Chart */}
    <Box display="flex" justifyContent="center" flexGrow={1} width="100%">
  <PieChart
    width={400}
    height={400}
    style={{ flexGrow: 1 }}
    aria-label={`Pie chart showing donation types: Digital and Efectivo. 
                 This chart visualizes the amount of donations by two types. 
                 Digital donations: ${processedData.totalByType[0].value}, 
                 Efectivo donations: ${processedData.totalByType[1].value}.`}
    role="img"
    tabIndex={0}
  >
    <Pie
      data={processedData.totalByType}
      cx="50%"
      cy="50%"
      outerRadius="80%"
      dataKey="value"
      label
      aria-label="Donations split by type, Digital and Efectivo"
      role="img"
    >
      {processedData.totalByType.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={DIGITAL_EFECTIVO_COLORS[index % DIGITAL_EFECTIVO_COLORS.length]}
          aria-label={`Donation type: ${entry.name}, Amount: ${entry.value}`}
          tabIndex={0} // Make each pie section focusable
          sx={{
            '&:focus': {
              backgroundColor: 'lightblue',
              outline: '2px solid blue',
            },
          }}
        />
      ))}
    </Pie>
    <Tooltip aria-label="Information about each donation type as you hover or focus on a section" />
  </PieChart>
</Box>


    <Typography
      variant="h6"
      style={{ marginTop: '40px' }}
      tabIndex={0}
      sx={{
        '&:focus': {
          backgroundColor: 'lightblue',
          outline: '2px solid blue',
        },
      }}
    >
      Costo de Sistema de filtrado de agua
    </Typography>

    <TextField
      type="number"
      label="Costo"
      variant="outlined"
      value={goal}
      onChange={(e) => setGoal(Number(e.target.value))}
      style={{ marginBottom: '40px', marginTop: '20px', flexGrow: 1, width: 'auto' }}
      inputProps={{
        'aria-label': 'Costo del sistema de filtrado de agua',
        tabIndex: 0,
      }}
    />

    {/* Donations over time */}
    <Typography
      variant="h6"
      style={{ marginTop: '20px' }}
      tabIndex={0}
      sx={{
        '&:focus': {
          backgroundColor: 'lightblue',
          outline: '2px solid blue',
        },
      }}
    >
      Donaciones a lo largo del tiempo
    </Typography>
    <Box display="flex" justifyContent="center" flexGrow={1} width="100%">
      <LineChart
        width={500}
        height={300}
        data={donationsOverTimeData}
        aria-label="Line chart showing donations over time"
        role="img"
        tabIndex={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" aria-label="Date axis" />
        <YAxis aria-label="Total donations axis" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Box>

    {/* Campaign totals */}
    <Typography
      variant="h6"
      style={{ marginTop: '20px' }}
      tabIndex={0}
      sx={{
        '&:focus': {
          backgroundColor: 'lightblue',
          outline: '2px solid blue',
        },
      }}
    >
      Total de Donaciones por Campaña
    </Typography>
    <Box display="flex" justifyContent="center" flexGrow={1} width="100%">
      <BarChart
        width={500}
        height={300}
        data={campaignData}
        aria-label="Bar chart showing total donations per campaign"
        role="img"
        tabIndex={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" aria-label="Campaign names" />
        <YAxis aria-label="Total donations axis" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </Box>
  </CardContent>
</Card>

  );
};

export default Dashboard;
