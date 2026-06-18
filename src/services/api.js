import axios from 'axios';

// Create a central Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Make sure this matches your backend port!
});

// Automatically intercept every request and attach the JWT token if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;