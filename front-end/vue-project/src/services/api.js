import axios from 'axios';


const API_URL = 'http://localhost:8000/api';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register(userData) {
        return api.post('/register', userData);
    },

    login(credentials) {
        return api.post('/login', credentials);
    },

    logout() {
        localStorage.removeItem('access_token');

    }
};