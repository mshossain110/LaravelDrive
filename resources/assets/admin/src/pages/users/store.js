
export default {
    namespaced: true,
    state: {
        users: [],
        pagination: {},
        errors: [],
    },
    getters: {
        users (state) {
            return state.users;
        },
        totalPage (state) {
            return state.pagination.total_pages;
        },
        totalUsers (state) {
            return state.pagination.total;
        },
        perPage (state) {
            return state.pagination.per_page;
        }
      
    },
    mutations: {
        getUsers (state, payload) {
          state.users = payload;
        },
        getPagination (state, payload) {
            state.pagination = payload;
        }

    },
    actions: {
        getUsers ({ commit }) {
            axios.get('/api/user')
                .then( res => { 
                    commit('getUsers', res.data.data)
                    commit('getPagination', res.data.meta)
                })
                .catch( errors => { console.log(errors)})

        }
    },
}