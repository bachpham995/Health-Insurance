// api/AxiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import Utility from './Utility';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
//config` for the full list of configs

const AxiosClient = axios.create({
    baseURL: Utility.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
AxiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
AxiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});
export default AxiosClient;
