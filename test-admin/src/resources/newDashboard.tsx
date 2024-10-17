import React, { useEffect, useState } from 'react';
import MyPieChart from '../components/charts/pie_chart';
import DateChart from '../components/charts/date_chart';
import FundraisingProgressWheel from '../components/charts/blurb_chart';
import Legend from '../components/charts/legend';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useDataProvider } from 'react-admin';

const MyDashboard = () => {
    const dataProvider = useDataProvider();
    const [totalDonations, setTotalDonations] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [totalDonacionesDigitales, setTotalDigitalDonations] = useState(0);
    const [totalDonacionesFisicas, setTotalPhysicalDonations] = useState(0);
    const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);

    useEffect(() => {
        dataProvider.getDashboardData()
            .then(data => {
                const total = data.reduce((sum, donation) => sum + donation.value, 0);
                setTotalDonations(total);

                const totalDonantes = data.reduce((sum, donation) => sum + donation.donantes, 0);
                setTotalDonors(totalDonantes);

                const totalDonacionesDigitales = data
                    .filter(donation => donation.name === 'Digital')
                    .reduce((sum, donation) => sum + donation.value, 0);
                setTotalDigitalDonations(totalDonacionesDigitales);

                const totalDonacionesFisicas = data
                    .filter(donation => donation.name === 'Efectivo')
                    .reduce((sum, donation) => sum + donation.value, 0);
                setTotalPhysicalDonations(totalDonacionesFisicas);

                setPieChartData([
                    { name: 'Digital', value: totalDonacionesDigitales },
                    { name: 'Efectivo', value: totalDonacionesFisicas }
                ]);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, [dataProvider]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Donaciones Total</Typography>
                        <Legend number={totalDonations} currency={true} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Donantes Total</Typography>
                        <Legend number={totalDonors} currency={false} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Donaciones por tipo</Typography>
                        <MyPieChart data={pieChartData} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MyDashboard;