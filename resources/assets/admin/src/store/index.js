import Vue from 'vue'
import Vuex from 'vuex'
import UsersStore from '@ap/users/store'
import MediaStore from '@ap/media/store'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  root: true,
  state: {
    isAuthenticated: false,
    snackbar: {},
    status: '',
    hasLoadedOnce: false,
  },
  getters: {
    snackbar:  state =>state.snackbar,
    isAuthenticated: state => !!state.access_token,
  },
  mutations: {
    setSnackbar (state, payload) {
      state.snackbar = payload
    },
    setSnackbarHide (state) {
      state.snackbar.show = !state.snackbar.show
    },
    auth (state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    authRequest: ({commit}, payload) => {
      let actionUrl = '/login';
      let remember = payload.remember ? payload.remember : false;
      let data = {
        'email':payload.email,
        'password':payload.password,
        'remember': remember,
      }

      if(payload.action=='register'){
        actionUrl='/register';
        data = {
          'name':payload.name,
          'email':payload.email,
          'password':payload.password,
          'password_confirmation':payload.password_confirmation
        }
      }
      if(payload.action=='password-reset'){
        actionUrl='/password/reset';
        data = {
          'token':payload.token,
          'email':payload.email,
          'password':payload.password,
          'password_confirmation':payload.password_confirmation
        }
      }
      commit('authRequest');
      axios.post(actionUrl, data)
    },
    authLogout: ({commit}) => {
        // Cookies.remove('access_token');
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(() => {
              commit('authLogout');
              resolve();
            })
            .catch((err) => {
              commit('authError', err.response.data);
              reject(err);
            });
        })
    }
  },
  modules: {
    Users: UsersStore,
    Media: MediaStore
  }
})
