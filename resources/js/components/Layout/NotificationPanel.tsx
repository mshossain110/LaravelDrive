import { useEffect, useRef } from 'react';
import { useNotificationStore, NotificationItem } from '@/stores/notificationStore';
import {
    BellIcon,
    ShareIcon,
    CheckIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function NotificationPanel() {
    const {
        notifications,
        unreadCount,
        loading,
        nextPageUrl,
        panelOpen,
        setPanelOpen,
        fetchNotifications,
        fetchMoreNotifications,
        markAsRead,
        markAllAsRead,
    } = useNotificationStore();

    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (panelOpen) {
            fetchNotifications();
        }
    }, [panelOpen, fetchNotifications]);

    // Close panel when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setPanelOpen(false);
            }
        }
        if (panelOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [panelOpen, setPanelOpen]);

    if (!panelOpen) return null;

    return (
        <div
            ref={panelRef}
            className="absolute right-0 top-full mt-2 w-96 max-h-[480px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-900">
                    Notifications
                    {unreadCount > 0 && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                            {unreadCount}
                        </span>
                    )}
                </h3>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                    >
                        <CheckCircleIcon className="h-4 w-4" />
                        Mark all read
                    </button>
                )}
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto">
                {loading && notifications.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <BellIcon className="h-10 w-10 mb-2" />
                        <p className="text-sm">No notifications yet</p>
                    </div>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <NotificationRow
                                key={notification.id}
                                notification={notification}
                                onMarkRead={markAsRead}
                            />
                        ))}
                        {nextPageUrl && (
                            <button
                                onClick={fetchMoreNotifications}
                                className="w-full py-2 text-center text-xs font-medium text-brand-600 hover:bg-gray-50"
                            >
                                Load more
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function NotificationRow({
    notification,
    onMarkRead,
}: {
    notification: NotificationItem;
    onMarkRead: (id: string) => void;
}) {
    const isUnread = !notification.read_at;

    return (
        <div
            className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                isUnread ? 'bg-blue-50/50' : ''
            }`}
        >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <ShareIcon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-sm ${isUnread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                    {notification.data.message}
                </p>
                {notification.data.files && notification.data.files.length > 0 && (
                    <p className="mt-0.5 text-xs text-gray-500 truncate">
                        {notification.data.files.map((f) => f.name).join(', ')}
                    </p>
                )}
                <p className="mt-1 text-xs text-gray-400">{notification.created_at}</p>
            </div>
            {isUnread && (
                <button
                    onClick={() => onMarkRead(notification.id)}
                    title="Mark as read"
                    className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-brand-600"
                >
                    <CheckIcon className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
