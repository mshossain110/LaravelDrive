import MyDrive from './MyDrive'
import Stare from './Stared.vue'
import Trash from './Trash.vue'
import SharedWithMe from './SharedWithMe.vue'

const MediaRoute = [
    {
        path: 'media',
        name: 'media',
        component: MyDrive
    },
    {
        path: 'media/folder/:folderId',
        name: 'singleFolder',
        component: MyDrive
    },
    {
        path: 'media/starred',
        name: 'starred',
        component: Stare
    },
    {
        path: 'media/trash',
        name: 'trash',
        component: Trash
    },
    {
        path: 'media/trash/:folderId',
        name: 'trashFolder',
        component: Trash
    },
    {
        path: 'media/shared',
        name: 'shared',
        component: SharedWithMe
    },
    {
        path: 'media/shared/:folderId',
        name: 'sharedFolder',
        component: SharedWithMe
    }
]

export default MediaRoute
