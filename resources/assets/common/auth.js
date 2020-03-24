export default {
    methods: {

        parseJWT (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        },

        saveToken (token, name) {
            name = name || 'auth_token';
            window.localStorage[name] = token;
        },

        getToken (name) {
            name = name || 'auth_token';
            return window.localStorage[name];
        },

        removeToken (name) {
            name = name || 'auth_token';
            window.localStorage.removeItem(name);
        },
        login (params) {
            const remember = params.remember ? params.remember : false;
            const data = {
                email: params.email,
                password: params.password,
                remember: remember
            };
            return new Promise((resolve, reject) => {
                axios.post('/login', data)
                    .then((res) => {
                        this.saveToken(res.data.token);
                        resolve(res.data);
                    })
                    .catch((err) => {
                        this.errors.record(err.response.data.errors);
                        reject(err.response.data);
                    });
            });
        },
        register (params) {
            return new Promise((resolve, reject) => {
                axios.post('/register', params)
                    .then((res) => {
                        this.saveToken(res.data.token);
                        resolve(res.data);
                    })
                    .catch((err) => {
                        this.errors.record(err.response.data.errors);
                        reject(err.response.data);
                    });
            });
        },
        logout () {
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                    .then((res) => {
                        this.removeToken();
                        location.replace('/login');
                        resolve(res.data);
                    })
                    .catch((err) => {
                        reject(err.response.data);
                    });
            });
        }
    }
};
