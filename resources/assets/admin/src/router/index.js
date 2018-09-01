import DashRoute from '@ap/dashboard/route';
import UserRoute from '@ap/users/route';

let Routes = [];

Routes.push(DashRoute);
Routes = Routes.concat(UserRoute);

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
