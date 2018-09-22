import Media from './Media';


const MediaRoute = [
    {
        path: 'media',
        name: 'media',
        component: Media,
    },
    {
        path: 'media/folder/:folderId',
        name: 'singleFolder',
        component: Media,
    }
];

export default MediaRoute;

