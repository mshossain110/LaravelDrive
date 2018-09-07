import DashRoute from '@ap/dashboard/route';
import UserRoute from '@ap/users/route';
import MediaRoute from '@ap/media/route';
let Routes = [];

Routes.push(DashRoute);
Routes = Routes.concat(UserRoute);
Routes = Routes.concat(MediaRoute);

export default [
    {
        path: '/',
        component: {
            render(c) {
                return c('router-view');
            },
        },
        redirect: { name: 'dashboard' },
        children: Routes,

    },
];
