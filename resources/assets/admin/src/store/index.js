import Vuex from 'vuex';
import UsersStore from '@ap/users/store'
import Vue from 'vue';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
    },
    getters: {
        getCount (state) {
            return state.count;
        }
      
    },
    mutations: {
        increment (state, payload) {
          state.count += payload.amount
        }
    },
    actions: {
        incrementAsync ({ commit }, payload) {
          setTimeout(() => {
            commit('increment')
          }, 1000)
        }
    },
    modules: {
        Users: UsersStore,
    }
});