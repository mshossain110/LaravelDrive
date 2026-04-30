import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || window.location.origin,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

// Add CSRF token
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    api.defaults.headers.common['X-CSRF-TOKEN'] = (token as HTMLMetaElement).content;
}

// Sanctum CSRF cookie helper
let csrfCookieFetched = false;

const getCsrfCookie = async () => {
    if (!csrfCookieFetched) {
        await api.get('/sanctum/csrf-cookie');
        csrfCookieFetched = true;
    }
};

// Request interceptor - fetch CSRF cookie before API requests
api.interceptors.request.use(
    async (config) => {
        if (config.url?.startsWith('/api')) {
            await getCsrfCookie();
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            csrfCookieFetched = false;
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
