
export default {
  namespaced: true,
  state: {
    mediaItems: [],
    pagination: {}
  },
  getters: {
    mediaItems (state) {
      return state.mediaItems
    },
    pagination (state) {
      return state.pagination
    }
  },
  mutations: {
    setMediaItems (state, payload) {
      state.mediaItems = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    addFolder (state, payload) {
    //   console.log(payload)
    }
  },
  actions: {
    getMediaItems ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios.get('/api/file', { params })
          .then((res) => {
            commit('setMediaItems', res.data.data)
            commit('setPagination', res.data.meta.pagination)
            resolve(res.data)
          })
          .catch((error) => {
            commit('setSnackbar',
              {
                message: error.response.data.message,
                status: error.response.status,
                color: 'error',
                show: true
              },
              { root: true })
            reject(error.response)
          })
      })
    },
    addFolder ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios.post('/api/folder', params)
          .then((res) => {
            commit('addFolder', res.data.data)
            resolve(res.data)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    }
  }

}
