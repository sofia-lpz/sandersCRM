import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://127.0.0.1:8080/api');

export default dataProvider;