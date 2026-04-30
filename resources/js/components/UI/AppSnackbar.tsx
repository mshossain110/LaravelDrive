import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

export default function AppSnackbar() {
    const { snackbar, hideSnackbar } = useAppStore();

    useEffect(() => {
        if (snackbar.show) {
            const timer = setTimeout(hideSnackbar, 4000);
            return () => clearTimeout(timer);
        }
    }, [snackbar.show, hideSnackbar]);

    if (!snackbar.show) return null;

    const colorClasses = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
            <div
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${colorClasses[snackbar.color]}`}
            >
                <span>{snackbar.message}</span>
                <button
                    onClick={hideSnackbar}
                    className="ml-2 rounded p-0.5 hover:bg-white/20"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
