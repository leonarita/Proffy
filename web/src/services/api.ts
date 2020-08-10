import axios from 'axios'
import { getTokenSessionStorage } from './token';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

api.interceptors.request.use(async config => {

    const token = getTokenSessionStorage();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});
  

export default api

