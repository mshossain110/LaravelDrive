
function getNestedFolders (arr, parent = 0) {
    let out = []
    arr = arr || []
    arr.forEach((e, i) => {
        if (e.parent_id === parent) {
            let children = getNestedFolders(arr.slice(i + 1), e.id)

            if (children.length) {
                e.children = children
            } else {
                e.children = []
            }
            out.push(e)
        }
    })
    return out
}

export default {
    namespaced: true,
    state: {
        mediaItems: [],
        folders: [],
        pagination: {},
        fileInfoSideBar: false,
        newFolderModal: false,
        shareFileModal: false,
        renamefilemodal: false,
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
            return getNestedFolders(state.folders.slice(), 0)
        }
    },
    mutations: {
        setMediaItems (state, payload) {
            state.mediaItems = payload
        },
        setMediaItem (state, payload) {
            state.mediaItems.push(payload)
        },
        setPagination (state, payload) {
            state.pagination = payload
        },
        setFolder (state, payload) {
            state.folders = payload
        },
        addFolder (state, payload) {
            state.mediaItems.unshift(payload)
            state.folders.unshift(payload)
        },
        toggleSidebar (state, payload = null) {
            if (payload !== null) {
                state.fileInfoSideBar = payload
            } else {
                state.fileInfoSideBar = !state.fileInfoSideBar
            }
        },
        selectMediaItem (state, payload) {
            state.selectedMedia = payload
        },
        selectFiles (state, payload) {
            if (payload.isMultiSelect) {
                state.selectedFilesId.push(payload.id)
            } else {
                state.selectedFilesId = [payload.id]
            }
        },
        deselectFile (state) {
            state.selectedFilesId = []
            state.selectedMedia = {}
        },
        newFolderModal (state, payload) {
            state.newFolderModal = payload
        },
        shareFileModal (state, payload) {
            state.shareFileModal = payload
        },
        renamefilemodal (state, payload) {
            state.renamefilemodal = payload
        },
        contextMenu (state, payload) {
            state.contextMenu = payload
        },
        addStar (state, ids) {
            state.mediaItems.map(item => {
                if (ids.findIndex(id => id === item.id) !== -1) {
                    item.stared = true
                }
            })
        },
        removeStart (state, ids) {
            state.mediaItems.map(item => {
                if (ids.findIndex(id => id === item.id) !== -1) {
                    item.stared = false
                }
            })
        },
        updateItem (state, payload) {
            let i = state.mediaItems.findIndex(item => item.id === payload.id)
            if (i !== -1) {
                state.mediaItems[i] = payload
            }
        },
        deleteItem (state, payload) {
            payload.ids.map(id => {
                let i = state.mediaItems.findIndex(item => item.id === id)
                if (i !== -1) {
                    state.mediaItems.splice(i, 1)
                }
            })
        },
        copyFile (state, payload) {
            state.mediaItems = state.mediaItems.concat(payload.data)
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
        updateItem ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/file/${params.id}`, params)
                    .then((res) => {
                        commit('updateItem', res.data)
                        resolve(res.data)
                    })
                    .catch((error) => {
                        reject(error.response)
                    })
            })
        },
        deleteItem ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/file/delete`, { params })
                    .then((res) => {
                        commit('deleteItem', params)
                        resolve(res.data)
                    })
                    .catch((error) => {
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
        },
        addStar ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/tag/star', params)
                    .then((res) => {
                        commit('addStar', params.ids)
                        resolve(res.data)
                    })
                    .catch((error) => {
                        reject(error.response)
                    })
            })
        },
        removeStar ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/tag/unstar', params)
                    .then((res) => {
                        commit('removeStart', params.ids)
                        resolve(res.data)
                    })
                    .catch((error) => {
                        reject(error.response)
                    })
            })
        },
        copyFile ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/file/copy', params)
                    .then((res) => {
                        commit('copyFile', res.data)
                        resolve(res.data)
                    })
                    .catch((error) => {
                        reject(error.response)
                    })
            })
        },
        downloadFile ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/download', params, {
                    responseType: 'blob'
                })
                    .then((res) => {
                        var filename = ''
                        var disposition = res.headers['content-disposition']

                        if (disposition) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                            var matches = filenameRegex.exec(disposition)

                            if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '')
                        }
                        // var linkelem = document.createElement('a')
                        try {
                            var blob = res.data

                            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                                //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                                window.navigator.msSaveBlob(blob, filename)
                            } else {
                                var URL = window.URL || window.webkitURL
                                var downloadUrl = URL.createObjectURL(blob)

                                if (filename) {
                                    // use HTML5 a[download] attribute to specify filename
                                    var a = document.createElement('a')

                                    // safari doesn't support this yet
                                    if (typeof a.download === 'undefined') {
                                        window.location = downloadUrl
                                    } else {
                                        a.href = downloadUrl
                                        a.download = filename
                                        document.body.appendChild(a)
                                        a.target = '_blank'
                                        a.click()
                                    }
                                } else {
                                    window.location = downloadUrl
                                }
                            }
                            resolve(res)
                        } catch (ex) {
                            reject(ex)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }

}
