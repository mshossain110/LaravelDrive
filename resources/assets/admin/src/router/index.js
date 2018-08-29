import DashRoute from '@ap/Dashboard/route';
import UserRoute from '@ap/Users/route';

const Routes = [];

Routes.push(DashRoute);
Routes.push(UserRoute);

const User = {
    template: '<div>User Hello</div>'
  }
export default [
    {
        path: '/',
        component: {
            render (c) { return c('router-view') }
        },
        redirect: { name: 'dashboard' },
        children: Routes

    }
]