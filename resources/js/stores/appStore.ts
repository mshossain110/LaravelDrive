import { create } from 'zustand';
import api from '@/lib/axios';
import type { Snackbar } from '@/types';

interface AppState {
    isAuthenticated: boolean;
    snackbar: Snackbar;
    setSnackbar: (snackbar: Snackbar) => void;
    hideSnackbar: () => void;
    authRequest: (email: string, password: string, remember?: boolean) => Promise<void>;
    authLogout: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
    isAuthenticated: false,
    snackbar: { show: false, message: '', color: 'info' },

    setSnackbar: (snackbar) => set({ snackbar }),
    hideSnackbar: () => set((state) => ({ snackbar: { ...state.snackbar, show: false } })),

    authRequest: async (email, password, remember = false) => {
        await api.post('/login', { email, password, remember });
        set({ isAuthenticated: true });
    },

    authLogout: async () => {
        await api.post('/logout');
        set({ isAuthenticated: false });
    },
}));
