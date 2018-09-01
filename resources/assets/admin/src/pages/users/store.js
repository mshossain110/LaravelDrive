
export default {
    namespaced: true,
    state: {
        users: [],
        pagination: {},
        errors: [],
    },
    getters: {
        users(state) {
            return state.users;
        },
        pagination(state) {
            return state.pagination;
        },
    },
    mutations: {
        getUsers(state, payload) {
            state.users = payload;
        },
        getPagination(state, payload) {
            state.pagination = payload;
        }

    },
    actions: {
        getUsers({ commit }, params) {
            axios.get('/api/users', { params })
                .then((res) => {
                    commit('getUsers', res.data.data);
                    commit('getPagination', res.data.meta.pagination);
                })
                .catch((errors) => { console.log(errors); });
        },
    },
};
