import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// Set base URL for API requests
const baseURL = import.meta.env.VITE_API_URL || window.location.origin;
window.axios.defaults.baseURL = baseURL;

// Add CSRF token to requests
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Sanctum CSRF Cookie helper
let csrfCookieFetched = false;

const getCsrfCookie = async () => {
    if (!csrfCookieFetched) {
        await window.axios.get('/sanctum/csrf-cookie');
        csrfCookieFetched = true;
    }
};

// Axios request interceptor - fetch CSRF cookie before API requests
window.axios.interceptors.request.use(
    async (config) => {
        // Only fetch CSRF cookie for API requests
        if (config.url && config.url.startsWith('/api')) {
            await getCsrfCookie();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios response interceptor - handle authentication errors
window.axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Reset CSRF cookie flag on 401
            csrfCookieFetched = false;
            
            // Redirect to login if not already there
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

window.LD.getUserPermissions = function getUserPermissions () {
    return LD.user.permissions || null;
};
window.LD.hasPermission = function hasPermission (p) {
    if (!LD.user.permissions || !LD.user.permissions.length) {
        return false;
    }
    if (LD.user.permissions.indexOf('administrator') !== -1) {
        return true;
    }

    return LD.user.permissions.indexOf(p) !== -1;
};