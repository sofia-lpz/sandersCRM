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
    const [dateChartData, setDateChartData] = useState<{ month: string; ingresos: number }[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
    const [campaignData, setCampaignData] = useState<{ campana: string; ingresos: number }[]>([]);
    const [averageDonation, setAverageDonation] = useState(0);

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
                const filteredData = selectedYear === 'all' ? data : data.filter(donation => getYear(donation.fecha) === selectedYear);

                setDonacionesData(filteredData);

                const monthMap = new Map<string, number>([
                    ['Ene', 0], ['Feb', 0], ['Mar', 0], ['Abr', 0], ['May', 0], ['Jun', 0],
                    ['Jul', 0], ['Ago', 0], ['Sep', 0], ['Oct', 0], ['Nov', 0], ['Dic', 0]
                ]);

                const campaignNames = [...new Set(filteredData.map(donation => donation.campana))];
                const campaignMap = new Map<string, number>();
                campaignNames.forEach(campaign => campaignMap.set(campaign, 0));

                filteredData.forEach(donation => {
                    const month = getMonthName(donation.fecha);
                    monthMap.set(month, monthMap.get(month)! + donation.cantidad);

                    const campaign = donation.campana;
                    campaignMap.set(campaign, campaignMap.get(campaign)! + donation.cantidad);
                });

                const dateChartData = Array.from(monthMap, ([month, ingresos]) => ({ month, ingresos }));
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
                const averageDonation = totalNumberDonations > 0 ? totalDonations / totalNumberDonations : 0;

                setTotalDonors(totalDonors);
                setAverageDonation(averageDonation);
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
        setSelectedYear(newYear);
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="year-select-label">Año</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    aria-labelledby="year-select-label"
                    aria-label="Seleccionar Año"
                >
                    <MenuItem value="all">Todos los años</MenuItem>
                    {[2020, 2021, 2022, 2023, 2024].map(year => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} className="fixed-height">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Card role="region" aria-labelledby="total-donations-title">
                                <CardContent>
                                    <Typography id="total-donations-title" variant="h5" align="center">Total de Donaciones</Typography>
                                    <Legend number={totalDonations} currency={true} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card role="region" aria-labelledby="total-donors-title">
                                <CardContent>
                                    <Typography id="total-donors-title" variant="h5" align="center">Donantes</Typography>
                                    <Legend number={totalDonors} currency={false} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card role="region" aria-labelledby="total-number-donations-title">
                                <CardContent>
                                    <Typography id="total-number-donations-title" variant="h5" align="center">Número de Donaciones</Typography>
                                    <Legend number={totalNumberDonations} currency={false} />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card role="region" aria-labelledby="average-donation-title">
                                <CardContent>
                                    <Typography id="average-donation-title" variant="h5" align="center">Promedio de Donación</Typography>
                                    <Legend number={averageDonation} currency={true} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card role="region" aria-labelledby="campaign-donations-title">
                        <CardContent>
                            <Typography id="campaign-donations-title" variant="h5" align="center">Donaciones por Campaña</Typography>
                            <BarChart data={campaignData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card role="region" aria-labelledby="donations-by-type-title">
                        <CardContent>
                            <Typography id="donations-by-type-title" variant="h5" align="center">Donaciones por Tipo</Typography>
                            <MyPieChart data={pieChartData} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card role="region" aria-labelledby="donations-by-month-title">
                        <CardContent>
                            <Typography id="donations-by-month-title" variant="h5" align="center">Donaciones por Mes</Typography>
                            <DateChart data={dateChartData} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <style jsx>{`
                .fixed-height {
                    height: 200px;
                }
            `}</style>
        </>
    );
};

export default MyDashboard;