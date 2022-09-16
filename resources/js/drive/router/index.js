import DashRoute from '@/drive/Pages/Dashboard/route';
// import UserRoute from '@ac/Users/route';
// import MyDrive from '@ac/MyDrive/route';
// import TranslationRoute from '@ac/Translation/route';
let Routes = [];

Routes.push(DashRoute);
// Routes = Routes.concat(UserRoute);
// Routes = Routes.concat(MyDrive);
// Routes = Routes.concat(TranslationRoute);

export default [
    {
        path: '/',
        component: {
            render (c) {
                return c('router-view');
            }
        },
        redirect: { name: 'dashboard' },
        children: Routes

    }
];
