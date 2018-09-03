
export default {
    namespaced: true,
    state: {
        users: [],
        pagination: {},
        permissions: [],
        roles: [],
        errors: [],
    },
    getters: {
        users (state) {
            return state.users;
        },
        pagination (state) {
            return state.pagination;
        },
        permissions (state) {
            return state.permissions;
        },
    },
    mutations: {
        setUsers (state, payload) {
            state.users = payload;
        },
        addUser (state, payload) {
            state.users.sclice(0, 0, payload);
        },
        editUser (state, payload) {
            const i = state.users.findIndex(u => u.id === payload.id);
            if (i !== -1) {
                state.users[i] = payload;
            }
        },
        deleteUser (state, id) {
            const i = state.users.findIndex(u => u.id === id);
            if (i !== -1) {
                state.users.sclice(i, 1);
            }
        },
        setPagination (state, payload) {
            state.pagination = payload;
        },
        setPermissions (state, payload) {
            state.permissions = payload;
        },
        setError (state, payload) {
            state.errors = payload;
        },

    },
    actions: {
        getUsers ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.get('/api/users', { params })
                    .then((res) => {
                        commit('setUsers', res.data.data);
                        commit('setPagination', res.data.meta.pagination);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true,
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        addUser ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/users', params)
                    .then((res) => {
                        commit('addUser', res.data.data);
                        commit('setSnackbar',
                            {
                                message: res.data.message,
                                status: res.status,
                                color: 'success',
                                show: true,
                            },
                            { root: true });
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setError', error.response.data);
                        reject(error.response);
                    });
            });
        },
        editUser ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/users/${params.id}`, params)
                    .then((res) => {
                        commit('editUser', res.data.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true,
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        deleteUser ({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/users/${id}`)
                    .then((res) => {
                        commit('deleteUser', id);
                        commit('setSnackbar',
                            {
                                message: res.data.message,
                                status: res.status,
                                color: 'success',
                                show: true,
                            },
                            { root: true });
                        resolve(true);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true,
                            },
                            { root: true });
                        reject(error.response);
                    })
            });
        },
        getPermissions ({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/permissions')
                    .then((res) => {
                        commit('setPermissions', res.data.data);
                        resolve(res.data.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true,
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
    },
};
