import Users from './Users';
import Roles from './Roles.vue';
import Profile from './Profile';


const UsersRoute = [
    {
        path: 'users',
        name: 'users',
        component: Users,
    },
    {
        path: 'users/roles',
        name: 'users-role',
        component: Roles
    },
    {
        path: 'users/:id',
        name: 'users-profile',
        component: Profile
    }
];

export default UsersRoute;

