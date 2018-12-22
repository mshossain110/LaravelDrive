
function getNestedFolders(arr, parent=0) {
  let out = [];
  arr = arr || [];
  arr.forEach((e, i)=> {
      if (e.parent_id == parent) {
          let children = getNestedFolders(arr.slice(i+1), e.id);

          if (children.length) {
              e.children = children
          } else {
            e.children = [];
          }
          out.push(e);
      }
  });
  return out;
}

export default {
  namespaced: true,
  state: {
    mediaItems: [],
    folders: [],
    pagination: {},
    fileInfoSideBar: false,
    newFolderModal: false,
    selectedMedia: {},
    selectedFilesId: [],
    contextMenu: {
      show: false, x: 0, y: 0
    }
  },
  getters: {
    mediaItems (state) {
      return state.mediaItems
    },
    pagination (state) {
      return state.pagination
    },
    fileInfoSideBar (state) {
      return state.fileInfoSideBar
    },
    selectedMedia (state) {
      return state.selectedMedia
    },
    getNestedFolders (state) {
      return getNestedFolders(state.folders.slice(), 0);
    }
  },
  mutations: {
    setMediaItems (state, payload) {
      state.mediaItems = payload
    },
    setPagination (state, payload) {
      state.pagination = payload
    },
    setFolder (state, payload ) {
      state.folders = payload;
    },
    addFolder (state, payload) {
      state.mediaItems.unshift(payload);
      state.folders.unshift(payload)
    },
    toggleSidebar (state, payload = null) {
      if (payload !== null) {
        state.fileInfoSideBar = payload;
      } else {
        state.fileInfoSideBar = !state.fileInfoSideBar
      }
    },
    selectMediaItem (state, payload) {
      state.selectedMedia = payload;
    },
    selectFiles (state, payload) {
      if (payload.isMultiSelect) {
        state.selectedFilesId.push(payload.id);
      } else {
        state.selectedFilesId = [payload.id];
      }
    },
    deselectFile (state) {
      state.selectedFilesId = [];
      state.selectedMedia = {};
    },
    newFolderModal (state, payload) {
      state.newFolderModal = payload;
    },
    contextMenu (state, payload) {
      state.contextMenu = payload;
    }
  },
  actions: {
    getMediaItems ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios.get('/api/file', { params })
          .then((res) => {
            commit('setMediaItems', res.data.data)
            // commit('setPagination', res.data.meta.pagination)
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
    getFolders ({ commit }, params) {
      return new Promise((resolve, reject) => {
        axios.get('/api/folder', params)
          .then((res) => {
            commit('setFolder', res.data.data)
            resolve(res.data)
          })
          .catch((error) => {
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
