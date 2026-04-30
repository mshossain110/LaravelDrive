import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ChatBubbleLeftIcon,
    BellIcon,
} from '@heroicons/react/24/outline';
import MenuItems from './MenuItems';
import UserInfo from './UserInfo';
import AppSnackbar from '@/components/UI/AppSnackbar';

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div id="ld" className="flex h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand */}
                <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-gray-900">LaravelDrive</span>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto py-3">
                    <MenuItems />
                </div>

                {/* User info */}
                <UserInfo />
            </aside>

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6">
                    <button
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="relative hidden flex-1 sm:block sm:max-w-md">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search files & folders…"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                    </div>

                    <div className="flex-1 sm:hidden" />

                    <div className="flex items-center gap-1">
                        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                            <ChatBubbleLeftIcon className="h-5 w-5" />
                        </button>
                        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>

            <AppSnackbar />
        </div>
    );
}
