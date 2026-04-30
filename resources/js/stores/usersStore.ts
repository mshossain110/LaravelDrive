import { create } from 'zustand';
import api from '@/lib/axios';
import { useAppStore } from './appStore';
import type { User, Role, Pagination } from '@/types';

interface UsersState {
    users: User[];
    pagination: Pagination;
    permissions: string[];
    roles: Role[];
    errors: Record<string, unknown>;

    // Actions
    setUsers: (users: User[]) => void;
    setPagination: (p: Pagination) => void;
    setRoles: (roles: Role[]) => void;
    setPermissions: (perms: string[]) => void;

    // Async
    fetchUsers: (params?: Record<string, unknown>) => Promise<void>;
    addUser: (params: Record<string, unknown>) => Promise<User>;
    updateUser: (params: Record<string, unknown> & { id: number }) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    searchUsers: (params: Record<string, unknown>) => Promise<{ data: User[] }>;
    fetchPermissions: () => Promise<string[]>;
    fetchRoles: (params?: Record<string, unknown>) => Promise<void>;
    addRole: (params: Record<string, unknown>) => Promise<Role>;
    updateRole: (params: Record<string, unknown> & { id: number }) => Promise<void>;
    deleteRole: (id: number) => Promise<void>;
}

const showError = (error: unknown) => {
    const err = error as { response?: { data?: { message?: string }; status?: number } };
    if (err?.response?.data?.message) {
        useAppStore.getState().setSnackbar({
            message: err.response.data.message,
            color: 'error',
            show: true,
        });
    }
};

const showSuccess = (message: string) => {
    useAppStore.getState().setSnackbar({
        message,
        color: 'success',
        show: true,
    });
};

export const useUsersStore = create<UsersState>((set, get) => ({
    users: [],
    pagination: {},
    permissions: [],
    roles: [],
    errors: {},

    setUsers: (users) => set({ users }),
    setPagination: (p) => set({ pagination: p }),
    setRoles: (roles) => set({ roles }),
    setPermissions: (perms) => set({ permissions: perms }),

    fetchUsers: async (params) => {
        try {
            const res = await api.get('/api/users', { params });
            set({ users: res.data.data, pagination: res.data.meta.pagination });
        } catch (error) {
            showError(error);
        }
    },

    addUser: async (params) => {
        try {
            const res = await api.post('/api/users', params);
            set((s) => ({ users: [res.data.data, ...s.users] }));
            showSuccess(res.data.message);
            return res.data.data;
        } catch (error) {
            const err = error as { response?: { data?: Record<string, unknown> } };
            set({ errors: err?.response?.data || {} });
            throw error;
        }
    },

    updateUser: async (params) => {
        try {
            const res = await api.put(`/api/users/${params.id}`, params);
            set((s) => ({
                users: s.users.map((u) => (u.id === params.id ? res.data.data : u)),
            }));
        } catch (error) {
            showError(error);
        }
    },

    deleteUser: async (id) => {
        try {
            const res = await api.delete(`/api/users/${id}`);
            set((s) => ({ users: s.users.filter((u) => u.id !== id) }));
            showSuccess(res.data.message);
        } catch (error) {
            showError(error);
        }
    },

    searchUsers: async (params) => {
        const res = await api.get('/api/users/search', { params });
        return res.data;
    },

    fetchPermissions: async () => {
        try {
            const res = await api.get('/api/permissions');
            set({ permissions: res.data.data });
            return res.data.data;
        } catch (error) {
            showError(error);
            return [];
        }
    },

    fetchRoles: async (params) => {
        try {
            const res = await api.get('/api/roles', { params });
            set({ roles: res.data.data });
        } catch (error) {
            showError(error);
        }
    },

    addRole: async (params) => {
        try {
            const res = await api.post('/api/roles', params);
            set((s) => ({ roles: [res.data.data, ...s.roles] }));
            showSuccess(res.data.message);
            return res.data.data;
        } catch (error) {
            const err = error as { response?: { data?: Record<string, unknown> } };
            set({ errors: err?.response?.data || {} });
            throw error;
        }
    },

    updateRole: async (params) => {
        try {
            const res = await api.put(`/api/roles/${params.id}`, params);
            set((s) => ({
                roles: s.roles.map((r) => (r.id === params.id ? res.data.data : r)),
            }));
        } catch (error) {
            showError(error);
        }
    },

    deleteRole: async (id) => {
        try {
            const res = await api.delete(`/api/roles/${id}`);
            set((s) => ({ roles: s.roles.filter((r) => r.id !== id) }));
            showSuccess(res.data.message);
        } catch (error) {
            showError(error);
        }
    },
}));
