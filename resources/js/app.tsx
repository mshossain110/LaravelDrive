import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from '@/router/index';
import './lib/axios';

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
}
