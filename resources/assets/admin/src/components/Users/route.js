import Users from './Users';
import Roles from './Roles.vue';
import Profile from './Profile';
import Permissions from './Permissions';

const UsersRoute = [
    {
        path: 'users',
        name: 'users',
        component: Users
    },
    {
        path: 'users/roles',
        name: 'users-role',
        component: Roles,
        children: [
            {
                path: ':id/permissions',
                name: 'role-permissions',
                component: Permissions
            }
        ]
    },
    {
        path: 'users/:id',
        name: 'users-profile',
        component: Profile
    }
];

export default UsersRoute;
