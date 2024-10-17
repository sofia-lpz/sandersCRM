import React, { useEffect, useState } from 'react';
import MyPieChart from '../components/charts/pie_chart';
import DateChart from '../components/charts/date_chart';
import BarChart from '../components/charts/bar_chart';
import Legend from '../components/charts/legend';
import { Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDataProvider } from 'react-admin';

const MyDashboard = () => {
    const dataProvider = useDataProvider();
    const [totalNumberDonations, setTotalNumberDonations] = useState(0);
    const [totalDonations, setTotalDonations] = useState(0);
    const [totalDonors, setTotalDonors] = useState(0);
    const [pieChartData, setPieChartData] = useState<{ name: string; value: number }[]>([]);
    const [donacionesData, setDonacionesData] = useState([]);
    const [totalDigitalDonations, setTotalDigitalDonations] = useState(0);
    const [totalPhysicalDonations, setTotalPhysicalDonations] = useState(0);
    const [dateChartData, setDateChartData] = useState<{ month: string; value: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
    const [campaignData, setCampaignData] = useState<{ campana: string; ingresos: number }[]>([]);

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
        dataProvider.getList('donaciones', {})
            .then(({ data }) => {
                // Filter data based on selected year
                const filteredData = selectedYear === 'all' ? data : data.filter(donation => getYear(donation.fecha) === selectedYear);

                setDonacionesData(filteredData);

                // Initialize monthMap with all months set to 0
                const monthMap = new Map<string, number>([
                    ['Ene', 0], ['Feb', 0], ['Mar', 0], ['Abr', 0], ['May', 0], ['Jun', 0],
                    ['Jul', 0], ['Ago', 0], ['Sep', 0], ['Oct', 0], ['Nov', 0], ['Dic', 0]
                ]);

                // Dynamically create campaignMap
                const campaignNames = [...new Set(filteredData.map(donation => donation.campana))];
                const campaignMap = new Map<string, number>();
                campaignNames.forEach(campaign => campaignMap.set(campaign, 0));

                filteredData.forEach(donation => {
                    const month = getMonthName(donation.fecha);
                    monthMap.set(month, monthMap.get(month)! + donation.cantidad);

                    const campaign = donation.campana;
                    campaignMap.set(campaign, campaignMap.get(campaign)! + donation.cantidad);
                });

                const dateChartData = Array.from(monthMap, ([month, value]) => ({ month, value }));
                const totalDonations = filteredData.reduce((acc: number, donation: any) => acc + donation.cantidad, 0);
                const totalDonors = new Set(filteredData.map((donation: any) => donation.id_donante)).size;
                const digitalDonations = filteredData.filter((donation: any) => donation.tipo === 'digital');
                const physicalDonations = filteredData.filter((donation: any) => donation.tipo === 'efectivo');
                const totalDigitalDonations = digitalDonations.reduce((acc: number, donation: any) => acc + donation.cantidad, 0);
                const totalPhysicalDonations = physicalDonations.reduce((acc: number, donation: any) => acc + donation.cantidad, 0);
                const pieChartData = [
                    { name: 'Donaciones Digitales', value: totalDigitalDonations },
                    { name: 'Donaciones en Efectivo', value: totalPhysicalDonations }
                ];
                const campaignData = Array.from(campaignMap, ([campana, ingresos]) => ({ campana, ingresos }));
                const totalNumberDonations = filteredData.length;

                setTotalDonors(totalDonors);
                setTotalNumberDonations(totalNumberDonations);
                setPieChartData(pieChartData);
                setTotalDigitalDonations(totalDigitalDonations);
                setTotalPhysicalDonations(totalPhysicalDonations);
                setTotalDonations(totalDonations);
                setDateChartData(dateChartData);
                setCampaignData(campaignData);
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
        <>
            <FormControl fullWidth>
                <InputLabel>Año</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                    <MenuItem value="all">Todos los años</MenuItem>
                    {[2020, 2021, 2022, 2023, 2024].map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center">Donaciones</Typography>
                            <Legend number={totalDonations} currency={true} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center">Donantes</Typography>
                            <Legend number={totalDonors} currency={false} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center">Numero de Donaciones</Typography>
                            <Legend number={totalNumberDonations} currency={false} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center">Donaciones por Campaña</Typography>
                            <BarChart data={campaignData} />
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
                            <DateChart data={dateChartData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default MyDashboard;