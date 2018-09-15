import Vue from 'vue';
import Vuex from 'vuex';
import UsersStore from '@ap/users/store'
import MediaStore from '@ap/media/store'

Vue.use(Vuex);

export default new Vuex.Store({
    root: true,
    state: {
        snackbar: {},
    },
    getters: {
        snackbar(state) {
            return state.snackbar;
        },
    },
    mutations: {
        setSnackbar(state, payload) {
            state.snackbar = payload;
        },
        setSnackbarHide(state) {
            state.snackbar.show = !state.snackbar.show;
        },
    },
    actions: {

    },
    modules: {
        Users: UsersStore,
        Media: MediaStore,
    },
});
