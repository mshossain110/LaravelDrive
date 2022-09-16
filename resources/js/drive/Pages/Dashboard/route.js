import Dashboard from '@/drive/Pages/Dashboard/Dashboard.vue';

const DashRoute = {
    path: 'dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
        icon: 'dashboard',
        text: 'Dashboard',
        disabled: false,
        permission: true
    }
};

export default DashRoute;
