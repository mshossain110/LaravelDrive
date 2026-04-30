import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Squares2X2Icon,
    UsersIcon,
    PhotoIcon,
    UserGroupIcon,
    StarIcon,
    TrashIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import FavoriteFolders from './FavoriteFolders';
import type { ComponentType } from 'react';

interface MenuItem {
    key?: string;
    icon?: string;
    text?: string;
    to?: string;
    disabled?: boolean;
    divider?: boolean;
    heading?: string;
    favorit?: boolean;
    children?: MenuItem[];
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    dashboard: Squares2X2Icon,
    group: UsersIcon,
    photo_library: PhotoIcon,
    co_present: UserGroupIcon,
    auto_awesome: StarIcon,
    delete: TrashIcon,
    star: StarIcon,
};

const items: MenuItem[] = [
    { icon: 'dashboard', text: 'Dashboard', to: '/dashboard', key: 'dashboard' },
    { divider: true, key: 'div-1' },
    { heading: 'Users', key: 'head-users' },
    { icon: 'group', text: 'Users', to: '/users', key: 'users' },
    { divider: true, key: 'div-2' },
    { heading: 'My Drive', key: 'head-drive' },
    { icon: 'photo_library', text: 'My Files', to: '/media', key: 'files' },
    { icon: 'co_present', text: 'Shared with me', to: '/media/shared', key: 'shared' },
    { icon: 'auto_awesome', text: 'Starred', to: '/media/starred', key: 'starred' },
    { icon: 'delete', text: 'Trash', to: '/media/trash', key: 'trash' },
];

export default function MenuItems() {
    return (
        <nav className="space-y-1 px-3">
            {items.map((item) => {
                if (item.favorit) return <FavoriteFolders key={item.key} />;
                if (item.heading) {
                    return (
                        <p key={item.key} className="mt-5 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            {item.heading}
                        </p>
                    );
                }
                if (item.divider) return <hr key={item.key} className="my-3 border-gray-200" />;
                if (item.children) return <MenuGroup key={item.key} item={item} />;

                const Icon = item.icon ? iconMap[item.icon] : null;
                return (
                    <NavLink
                        key={item.key}
                        to={item.to || '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                item.disabled ? 'pointer-events-none opacity-40' : ''
                            } ${
                                isActive
                                    ? 'bg-brand-50 font-medium text-brand-700'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {Icon && <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />}
                                <span>{item.text}</span>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </nav>
    );
}

function MenuGroup({ item }: Readonly<{ item: MenuItem }>) {
    const [open, setOpen] = useState(false);
    const Icon = item.icon ? iconMap[item.icon] : null;

    return (
        <div>
            <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                {Icon && <Icon className="h-5 w-5 text-gray-400" />}
                <span className="flex-1 text-left">{item.text}</span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="mt-1 ml-4 space-y-0.5">
                    {item.children?.map((child) => {
                        const ChildIcon = child.icon ? iconMap[child.icon] : null;
                        return (
                            <NavLink
                                key={child.key ?? child.to}
                                to={child.to || '/'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                        isActive
                                            ? 'bg-brand-50 font-medium text-brand-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                {ChildIcon && <ChildIcon className="h-5 w-5" />}
                                <span>{child.text}</span>
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
