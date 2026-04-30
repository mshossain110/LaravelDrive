import { createHashRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import Users from '@/components/Users/Users';
import Roles from '@/components/Users/Roles';
import Profile from '@/components/Users/Profile';
import Permissions from '@/components/Users/Permissions';
import MyDrive from '@/components/MyDrive/MyDrive';
import Starred from '@/components/MyDrive/Starred';
import Trash from '@/components/MyDrive/Trash';
import SharedWithMe from '@/components/MyDrive/SharedWithMe';

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            { path: 'users/roles', element: <Roles /> },
            { path: 'users/:id', element: <Profile /> },
            { path: 'users/roles/:id/permissions', element: <Permissions /> },
            { path: 'media', element: <MyDrive /> },
            { path: 'media/folder/:folderId', element: <MyDrive /> },
            { path: 'media/starred', element: <Starred /> },
            { path: 'media/trash', element: <Trash /> },
            { path: 'media/trash/:folderId', element: <Trash /> },
            { path: 'media/shared', element: <SharedWithMe /> },
            { path: 'media/shared/:folderId', element: <SharedWithMe /> },
        ],
    },
]);

export default router;
