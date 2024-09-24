import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const apiUrl = 'https://localhost:8080/api';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', token ? `Bearer ${token}` : '');
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(apiUrl, httpClient);

export default dataProvider;