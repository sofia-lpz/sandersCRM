import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const apiUrl = process.env.VITE_API_URL || "https://localhost:8080/api";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', token ? `Bearer ${token}` : '');
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(apiUrl, httpClient);

// Add custom method to dataProvider
dataProvider.getDashboardData = () => {
    return fetch(`${apiUrl}/dashboard/donaciones/total`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

export default dataProvider;