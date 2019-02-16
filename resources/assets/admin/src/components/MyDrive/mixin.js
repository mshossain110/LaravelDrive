import { mapState } from 'vuex'

export default {
    data () {
        return {
            drawer: false,
            isfilesLoaded: false,
            isfolderLoaded: false
        }
    },
    computed: {
        ...mapState('Media', ['mediaItems', 'pagination', 'folders', 'fileInfoSideBar']),
        currentFolder () {
            const hash = this.$route.params.folderId
            const i = this.folders.findIndex(m => m.hash === hash)
            if (i === -1) {
                return false
            } else {
                return this.folders[i]
            }
        },
        currentFolderId () {
            if (this.currentFolder) {
                return this.currentFolder.id
            } else {
                return 0
            }
        }
    },
    methods: {
        toggleSidebar () {
            this.$store.commit('Media/toggleSidebar')
        },
        loadFolders () {
            this.$store.dispatch('Media/getFolders')
                .then(() => {
                    this.isfolderLoaded = true
                })
        },
        openNewFolderModal () {
            this.$store.commit('Media/newFolderModal', true)
        },
        getMediaIcon (type) {
            switch (type) {
            case 'folder':
                return {
                    type: 'folder',
                    icon: '<span class="lafi material-icons">folder</span>',
                    color: '#fbc02d',
                    avatar: true
                }
            case 'text':
                return {
                    type: 'text',
                    icon: '<span class="lafi flaticon-txt"></span>',
                    color: '#2196f3',
                    avatar: true
                }
            case 'audio':
                return {
                    type: 'audio',
                    icon: '<span class="lafi flaticon-mp3"></span>',
                    color: '#ff9800',
                    avatar: true
                }
            case 'pdf':
                return {
                    type: 'pdf',
                    icon: '<span class="lafi flaticon-pdf"></span>',
                    color: '#f44336',
                    avatar: true
                }
            case 'archive':
                return {
                    type: 'archive',
                    icon: '<span class="lafi flaticon-zip"></span>',
                    color: '#FBC02D',
                    avatar: true
                }
            case 'video':
                return {
                    type: 'video',
                    icon: '<span class="lafi flaticon-mp4"></span>',
                    color: '#f44336',
                    avatar: true
                }
            case 'ai':
                return {
                    type: 'ai',
                    icon: '<span class="lafi flaticon-ai"></span>',
                    color: '#D9D7CA',
                    avatar: true
                }
            case 'avi':
                return {
                    type: 'avi',
                    icon: '<span class="lafi flaticon-avi"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'css':
                return {
                    type: 'css',
                    icon: '<span class="lafi flaticon-css"></span>',
                    color: '#0096E6',
                    avatar: true
                }
            case 'csv':
                return {
                    type: 'csv',
                    icon: '<span class="lafi flaticon-csv"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'dbf':
                return {
                    type: 'dbf',
                    icon: '<span class="lafi flaticon-dbf"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'doc':
                return {
                    type: 'doc',
                    icon: '<span class="lafi flaticon-doc"></span>',
                    color: '#8697CB',
                    avatar: true
                }
            case 'hrml':
                return {
                    type: 'html',
                    icon: '<span class="lafi flaticon-html"></span>',
                    color: '#EC6630',
                    avatar: true
                }
            case 'flash':
                return {
                    type: 'flash',
                    icon: '<span class="lafi flaticon-flash"></span>',
                    color: '#7A2F32',
                    avatar: true
                }
            case 'iso':
                return {
                    type: 'iso',
                    icon: '<span class="lafi flaticon-iso"></span>',
                    color: '#E9E9E0',
                    avatar: true
                }
            case 'javascript':
                return {
                    type: 'javascript',
                    icon: '<span class="lafi flaticon-javascript"></span>',
                    color: '#EEAF4B',
                    avatar: true
                }
            case 'mp3':
                return {
                    type: 'mp3',
                    icon: '<span class="lafi flaticon-mp3"></span>',
                    color: '#7D6599',
                    avatar: true
                }
            case 'ppt':
                return {
                    type: 'ppt',
                    icon: '<span class="lafi flaticon-ppt"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'psd':
                return {
                    type: 'psd',
                    icon: '<span class="lafi flaticon-psd"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'xls':
                return {
                    type: 'xls',
                    icon: '<span class="lafi flaticon-xls"></span>',
                    color: '#C8BDB8',
                    avatar: true
                }
            case 'xml':
                return {
                    type: 'xml',
                    icon: '<span class="lafi flaticon-xml"></span>',
                    color: '#F29C1F',
                    avatar: true
                }
            case 'image':
                return {
                    type: 'image',
                    icon: '<span class="lafi flaticon-jpg"></span>',
                    avatar: false
                }
            default :
                return {}
            }
        }

    }
}
