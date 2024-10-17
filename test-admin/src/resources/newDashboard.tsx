import React, { useEffect, useState } from 'react';
import MyPieChart from '../components/charts/pie_chart';
import DateChart from '../components/charts/date_chart';
import Legend from '../components/charts/legend';
import { Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDataProvider } from 'react-admin';

const MyDashboard = () => {
    const dataProvider = useDataProvider();
    const [totalDonations, setTotalDonations] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);
    const [donacionesData, setDonacionesData] = useState([]);
    const [totalDigitalDonations, setTotalDigitalDonations] = useState(0);
    const [totalPhysicalDonations, setTotalPhysicalDonations] = useState(0);
    const [dateChartData, setDateChartData] = useState<{ month: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

    const getMonthName = (dateString: string) => {
        const monthNames = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        const monthIndex = parseInt(dateString.split('-')[1], 10) - 1;
        return monthNames[monthIndex];
    };

    const getYear = (dateString: string) => {
        return parseInt(dateString.split('-')[0], 10);
    }

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

    useEffect(() => {
        console.log('Fetching data for year:', selectedYear); // Debugging log
        dataProvider.getList('donaciones', {})
            .then(({ data }) => {
                setDonacionesData(data);

                // Initialize monthMap with all months set to 0
                const monthMap = new Map<string, number>([
                    ['Ene', 0], ['Feb', 0], ['Mar', 0], ['Abr', 0], ['May', 0], ['Jun', 0],
                    ['Jul', 0], ['Ago', 0], ['Sep', 0], ['Oct', 0], ['Nov', 0], ['Dic', 0]
                ]);

                data.forEach(donation => {
                    const year = getYear(donation.fecha);
                    if (selectedYear === 'all' || year === selectedYear) {
                        const month = getMonthName(donation.fecha);
                        monthMap.set(month, monthMap.get(month)! + donation.cantidad);
                    }
                });

                const chartData = Array.from(monthMap, ([month, value]) => ({ month, value }));
                console.log('Filtered chartData:', chartData); // Debugging log
                setDateChartData(chartData);
            })
            .catch(error => {
                console.error('Error fetching donaciones data:', error);
            });
    }, [dataProvider, selectedYear]);

    const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newYear = event.target.value as number | 'all';
        console.log('Year changed to:', newYear); // Debugging log
        setSelectedYear(newYear);
    };

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
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Donaciones por mes</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Año</InputLabel>
                            <Select value={selectedYear} onChange={handleYearChange}>
                                <MenuItem value="all">Todos los años</MenuItem>
                                {[2020, 2021, 2022, 2023, 2024].map(year => (
                                    <MenuItem key={year} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DateChart data={dateChartData} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MyDashboard;