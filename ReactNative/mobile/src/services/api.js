import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.1.7:3333'
});

export default api;