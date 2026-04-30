import type { ReactNode, ComponentType } from 'react';
import {
    PhotoIcon,
    FolderOpenIcon,
    UsersIcon,
    CircleStackIcon,
} from '@heroicons/react/24/outline';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
    perm_media: PhotoIcon,
    folder_open: FolderOpenIcon,
    people: UsersIcon,
    memory: CircleStackIcon,
};

interface WidgetCountProps {
    icon?: string;
    children: ReactNode;
}

export default function WidgetCount({ icon, children }: WidgetCountProps) {
    const Icon = icon ? iconMap[icon] : null;
    return (
        <div className="flex items-stretch rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="flex w-16 shrink-0 items-center justify-center bg-brand-50">
                {Icon && <Icon className="h-7 w-7 text-brand-600" />}
            </div>
            <div className="flex-1 px-4 py-3">{children}</div>
        </div>
    );
}
