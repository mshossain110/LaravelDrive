import { create } from 'zustand';
import api from '@/lib/axios';

export interface NotificationItem {
    id: string;
    type: string;
    data: {
        shared_by: { id: number; name: string };
        files: { id: number; name: string; type: string }[];
        message: string;
    };
    read_at: string | null;
    created_at: string;
}

interface NotificationState {
    notifications: NotificationItem[];
    unreadCount: number;
    loading: boolean;
    nextPageUrl: string | null;
    panelOpen: boolean;
    setPanelOpen: (open: boolean) => void;
    fetchNotifications: () => Promise<void>;
    fetchMoreNotifications: () => Promise<void>;
    fetchUnreadCount: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    nextPageUrl: null,
    panelOpen: false,

    setPanelOpen: (open) => set({ panelOpen: open }),

    fetchNotifications: async () => {
        set({ loading: true });
        try {
            const { data } = await api.get('/api/notifications');
            set({
                notifications: data.data,
                unreadCount: data.unread_count,
                nextPageUrl: data.next_page_url,
            });
        } finally {
            set({ loading: false });
        }
    },

    fetchMoreNotifications: async () => {
        const { nextPageUrl, notifications } = get();
        if (!nextPageUrl) return;
        try {
            const { data } = await api.get(nextPageUrl);
            set({
                notifications: [...notifications, ...data.data],
                nextPageUrl: data.next_page_url,
            });
        } catch {
            // silently fail
        }
    },

    fetchUnreadCount: async () => {
        try {
            const { data } = await api.get('/api/notifications/unread-count');
            set({ unreadCount: data.unread_count });
        } catch {
            // silently fail
        }
    },

    markAsRead: async (id) => {
        try {
            const { data } = await api.patch(`/api/notifications/${id}/read`);
            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === id ? { ...n, read_at: new Date().toISOString() } : n
                ),
                unreadCount: data.unread_count,
            }));
        } catch {
            // silently fail
        }
    },

    markAllAsRead: async () => {
        try {
            await api.post('/api/notifications/mark-all-read');
            set((state) => ({
                notifications: state.notifications.map((n) => ({
                    ...n,
                    read_at: n.read_at || new Date().toISOString(),
                })),
                unreadCount: 0,
            }));
        } catch {
            // silently fail
        }
    },
}));
