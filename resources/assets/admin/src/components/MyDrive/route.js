import MyDrive from './MyDrive'

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
    }
]

export default MediaRoute
