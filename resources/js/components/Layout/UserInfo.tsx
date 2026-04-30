import { useState, useRef, useEffect } from 'react';
import {
    ChevronUpIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import api from '@/lib/axios';

export default function UserInfo() {
    const [menu, setMenu] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const currentUser = window.LD?.user;
    const fullname = currentUser?.firstname || currentUser?.lastname
        ? `${currentUser.firstname ?? ''} ${currentUser.lastname ?? ''}`.trim()
        : currentUser?.name ?? '';

    const initials = fullname
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?';

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menu && ref.current && !ref.current.contains(e.target as Node)) {
                setMenu(false);
            }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, [menu]);

    const logoutUser = () => {
        api.post('/logout').then(() => {
            location.replace('/login');
        });
    };

    return (
        <div className="border-t border-gray-200 p-3">
            <div className="relative" ref={ref}>
                <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-100 transition-colors"
                    onClick={() => setMenu(!menu)}
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                        {initials}
                    </span>
                    <span className="flex-1 truncate">
                        <span className="block text-sm font-medium text-gray-900 truncate">{fullname}</span>
                        <span className="block text-xs text-gray-500 truncate">{currentUser?.email}</span>
                    </span>
                    <ChevronUpIcon className="h-4 w-4 shrink-0 text-gray-400" />
                </button>

                {menu && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl bg-white shadow-lg ring-1 ring-gray-200 z-50">
                        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-base font-bold text-brand-700">
                                {initials}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{fullname}</p>
                                <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                            </div>
                        </div>
                        <div className="p-1.5">
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                <Cog6ToothIcon className="h-4 w-4 text-gray-400" />
                                Settings
                            </button>
                            <button
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                onClick={logoutUser}
                            >
                                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                Log out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
