import MyDrive from './MyDrive'
import Trash from './Trash.vue'

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
        component: MyDrive
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
    }
]

export default MediaRoute
