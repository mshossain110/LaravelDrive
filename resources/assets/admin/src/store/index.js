import Vue from 'vue'
import Vuex from 'vuex'
import UsersStore from '@ap/users/store'
import MediaStore from '@ap/media/store'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  root: true,
  state: {
    snackbar: {},
    access_token: Cookies.get('access_token') || '',
    status: '',
    hasLoadedOnce: false,
  },
  getters: {
    snackbar:  state =>state.snackbar,
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status,
    authErrors: state => state.errors,
  },
  mutations: {
    setSnackbar (state, payload) {
      state.snackbar = payload
    },
    setSnackbarHide (state) {
      state.snackbar.show = !state.snackbar.show
    },
    authRequest: (state) => {
      state.status = 'loading';
    },
    authSuccess: (state, access_token) => {
      state.status = 'success';
      state.access_token = access_token;
      state.hasLoadedOnce = true;
    },
    authError: (state, err) => {
      let errors=err.errors?err.errors:{};
      if(err.error=="invalid_credentials"){
        errors.invalid_credentials=['The user credentials were incorrect.'];
      }

      state.status = 'error';
      state.hasLoadedOnce = true;
      state.errors.record(errors);
    },
    authLogout: (state) => {
      state.access_token = '';
    }
  },
  actions: {
    authRequest: ({commit}, payload) => {
      let actionUrl = '/login';
      let remember = payload.remember ? payload.remember : false;
      let data = {
        'email':payload.email,
        'password':payload.password
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


        return new Promise((resolve, reject) => {
          commit('authRequest');
          axios.post(actionUrl, data)
            .then((resp) => {
              let access_token = 'Bearer ' + resp.data.token;
              Cookies.set('access_token', access_token, { expires: remember ? 365 : 1 });
              axios.defaults.headers.common['Authorization'] = access_token;

              commit('authSuccess', access_token);
              resolve(access_token);
            })
            .catch((err) => {
              commit('authError', err.response.data);
              Cookies.remove('access_token');
              reject(err);
            })
        })
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
