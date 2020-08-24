import axios from 'axios'
import { getToken } from './token';

const api = axios.create({
    baseURL: 'http://192.168.15.12:3333'
})

api.interceptors.request.use(async config => {

    config.headers.Authorization = `Bearer ${getToken()}`;
    
    return config;
});
  

export default api

