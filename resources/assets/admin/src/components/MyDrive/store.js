
function getNestedFolders (arr, parent = 0) {
    const out = [];
    arr = arr || [];
    arr.forEach((e, i) => {
        if (e.parent_id === parent) {
            const children = getNestedFolders(arr.slice(i + 1), e.id);

            if (children.length) {
                e.children = children;
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
        trashItems: [],
        trashPagination: {},
        staredItems: [],
        staredPagination: {},
        sharedItems: [],
        sharedPagination: {},
        fileInfoSideBar: false,
        newFolderModal: false,
        shareFileModal: false,
        shareLinkModal: false,
        renamefilemodal: false,
        moveToemodal: false,
        previewModal: false,
        selectedMedia: {},
        selectedFilesId: [],
        contextMenu: {
            show: false, x: 0, y: 0
        }
    },
    getters: {
        mediaItems (state) {
            return state.mediaItems;
        },
        pagination (state) {
            return state.pagination;
        },
        fileInfoSideBar (state) {
            return state.fileInfoSideBar;
        },
        selectedMedia (state) {
            return state.selectedMedia;
        },
        getNestedFolders (state) {
            return getNestedFolders(state.folders, 0);
        },
        favoriteFolders (state) {
            return state.folders.filter(f => f.stared);
        }
    },
    mutations: {
        setMediaItems (state, payload) {
            state.mediaItems = state.mediaItems.concat(payload);
        },
        setMediaItem (state, payload) {
            state.mediaItems.push(payload);
        },
        setPagination (state, payload) {
            state.pagination = payload;
        },
        emptyMediaItems (state) {
            state.mediaItems = [];
        },
        setFolder (state, payload) {
            state.folders = payload;
        },
        addFolder (state, payload) {
            state.mediaItems.unshift(payload);
            state.folders.unshift(payload);
        },
        toggleSidebar (state, payload = null) {
            if (payload !== null) {
                state.fileInfoSideBar = payload;
            } else {
                state.fileInfoSideBar = !state.fileInfoSideBar;
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
        shareFileModal (state, payload) {
            state.shareFileModal = payload;
        },
        shareLinkModal (state, payload) {
            state.shareLinkModal = payload;
        },
        renamefilemodal (state, payload) {
            state.renamefilemodal = payload;
        },
        moveToemodal (state, payload) {
            state.moveToemodal = payload;
        },
        previewModal (state, payload) {
            state.previewModal = payload;
        },
        contextMenu (state, payload) {
            state.contextMenu = payload;
        },
        addStar (state, ids) {
            state.mediaItems.map(item => {
                if (ids.findIndex(id => id === item.id) !== -1) {
                    item.stared = true;
                }
            });
        },
        removeStart (state, ids) {
            state.mediaItems.map(item => {
                if (ids.findIndex(id => id === item.id) !== -1) {
                    item.stared = false;
                }
            });
        },
        updateItem (state, payload) {
            const i = state.mediaItems.findIndex(item => item.id === payload.id);
            if (i !== -1) {
                state.mediaItems[i] = payload;
            }
        },
        deleteItem (state, payload) {
            payload.ids.map(id => {
                const i = state.mediaItems.findIndex(item => item.id === id);
                if (i !== -1) {
                    state.mediaItems.splice(i, 1);
                }
            });
        },
        copyFile (state, payload) {
            state.mediaItems = state.mediaItems.concat(payload.data);
        },
        setTrashItems (state, payload) {
            state.trashItems = state.trashItems.concat(payload);
        },
        emptyTrashItems (state) {
            state.trashItems = [];
        },
        setTrashPagination (state, payload) {
            state.trashPagination = payload;
        },
        setStaredItems (state, payload) {
            state.staredItems = state.staredItems.concat(payload);
        },
        emptyStaredItems (state) {
            state.staredItems = [];
        },
        setStaredPagination (state, payload) {
            state.staredPagination = payload;
        },

        setSharedItems (state, payload) {
            state.sharedItems = state.sharedItems.concat(payload);
        },
        emptySharedItems (state) {
            state.sharedItems = [];
        },
        setSharedPagination (state, payload) {
            state.sharedPagination = payload;
        },
        moveFile (state, payload) {
            const items = state.mediaItems.filter(i => payload.indexOf(i.id) === -1);
            state.mediaItems = items;
        }
    },
    actions: {
        getMediaItems ({ commit }, params) {
            return new Promise((resolve, reject) => {
                if (!params.page) {
                    commit('emptyMediaItems');
                }
                axios.get('/api/file', { params })
                    .then((res) => {
                        commit('setMediaItems', res.data.data);
                        commit('setPagination', res.data.meta);
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
        updateItem ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.put(`/api/file/${params.id}`, params)
                    .then((res) => {
                        commit('updateItem', res.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        deleteItem ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.delete('/api/file/delete', { params })
                    .then((res) => {
                        commit('deleteItem', params);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        getFolders ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.get('/api/folder', params)
                    .then((res) => {
                        commit('setFolder', res.data.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        addFolder ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/folder', params)
                    .then((res) => {
                        commit('addFolder', res.data.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        addStar ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/tag/star', params)
                    .then((res) => {
                        commit('addStar', params.ids);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        removeStar ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/tag/unstar', params)
                    .then((res) => {
                        commit('removeStart', params.ids);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        copyFile ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/file/copy', params)
                    .then((res) => {
                        commit('copyFile', res.data);
                        resolve(res.data);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        downloadFile ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/download', params, {
                    responseType: 'blob'
                })
                    .then((res) => {
                        var filename = '';
                        var disposition = res.headers['content-disposition'];

                        if (disposition) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(disposition);

                            if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                        }
                        // var linkelem = document.createElement('a')
                        try {
                            var blob = res.data;

                            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                                //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                                window.navigator.msSaveBlob(blob, filename);
                            } else {
                                var URL = window.URL || window.webkitURL;
                                var downloadUrl = URL.createObjectURL(blob);

                                if (filename) {
                                    // use HTML5 a[download] attribute to specify filename
                                    var a = document.createElement('a');

                                    // safari doesn't support this yet
                                    if (typeof a.download === 'undefined') {
                                        window.location = downloadUrl;
                                    } else {
                                        a.href = downloadUrl;
                                        a.download = filename;
                                        document.body.appendChild(a);
                                        a.target = '_blank';
                                        a.click();
                                    }
                                } else {
                                    window.location = downloadUrl;
                                }
                            }
                            resolve(res);
                        } catch (ex) {
                            reject(ex);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getTrashItems ({ commit }, params) {
            return new Promise((resolve, reject) => {
                if (!params.page) {
                    commit('emptyTrashItems');
                }
                axios.get('/api/file/trash', { params })
                    .then((res) => {
                        commit('setTrashItems', res.data.data);
                        commit('setTrashPagination', res.data.meta.pagination);
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
        getStaredItems ({ commit }, params) {
            return new Promise((resolve, reject) => {
                if (!params.page) {
                    commit('emptyStaredItems');
                }
                axios.get('/api/file/star', { params })
                    .then((res) => {
                        commit('setStaredItems', res.data.data);
                        commit('setStaredPagination', res.data.meta.pagination);
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
        getSharedItems ({ commit }, params) {
            return new Promise((resolve, reject) => {
                if (!params.page) {
                    commit('emptySharedItems');
                }
                axios.get('/api/shared/files', { params })
                    .then((res) => {
                        commit('setSharedItems', res.data.data);
                        commit('setSharedPagination', res.data.meta.pagination);
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
        moveFiles ({ commit }, params) {
            return new Promise((resolve, reject) => {
                axios.post('/api/file/move', params)
                    .then(res => {
                        resolve(res.data.data);
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
