import Vuex from 'vuex';


const store = new Vuex.Store({
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
    }
});

export default store;