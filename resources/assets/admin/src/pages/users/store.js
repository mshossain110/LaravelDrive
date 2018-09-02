
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
            axios.get('/api/users', { params })
                .then((res) => {
                    commit('setUsers', res.data.data);
                    commit('setPagination', res.data.meta.pagination);
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
                });
        },
        addUser ({ commit }, params) {
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
                })
                .catch((error) => {
                    commit('setError', error.response.data);
                });
        },
        getPermissions ({ commit }) {
            axios.get('/api/permissions')
                .then((res) => {
                    commit('setPermissions', res.data.data);
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
                });
        },
    },
};
