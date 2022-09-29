
export default {
    namespaced: true,
    state: {
        languages: {},
        translations: [],
        groups: []
    },
    mutations: {
        setLanguages (state, payload) {
            state.languages = payload;
        },
        addLanguages (state, payload) {
            state.languages[payload.name] = payload.locale;
        },
        setTranslations (state, payload) {
            state.translations = payload;
        },
        setTranslationsGroup (state, payload) {
            state.groups = payload;
        }

    },
    actions: {
        getLanguages ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.get('/api/translation/languages', { params })
                    .then((res) => {
                        commit('setLanguages', res.data.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        storeLanguages ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/translation/languages', params)
                    .then((res) => {
                        commit('addLanguages', params);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        getTranslations ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/translation/${params.language}/translations`, { params })
                    .then((res) => {
                        const response = res.data.data;
                        const trans = [];
                        const group = [];
                        for (const type in response) {
                            for (const gropu in response[type]) {
                                for (const key in response[type][gropu]) {
                                    if (Array.isArray(response[type][gropu][key].en)) {
                                        continue;
                                    };
                                    if (group.indexOf(gropu) === -1) {
                                        group.push(gropu);
                                    }
                                    trans.push(Object.assign(response[type][gropu][key], {
                                        key: key,
                                        group: gropu
                                    }));
                                }
                            }
                        }

                        commit('setTranslations', trans);
                        commit('setTranslationsGroup', group);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        storeTranslations ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/translation/${params.language}/translations`, params)
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        },
        updateTranslations ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/translation/${params.language}/translations`, params)
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((error) => {
                        commit('setSnackbar',
                            {
                                message: error.response.data.message,
                                status: error.response.status,
                                color: 'error',
                                show: true
                            },
                            { root: true });
                        reject(error.response);
                    });
            });
        }

    }
};
