import Dashboard from './Dashboard';

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
