import axios from 'axios';

//Providing URL per request
export const httpClient = axios.create({
    maxRedirects: 5,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});