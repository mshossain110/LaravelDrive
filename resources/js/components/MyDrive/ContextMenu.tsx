import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useMediaStore } from '@/stores/mediaStore';
import { useLocation } from 'react-router-dom';
import {
    EyeIcon,
    UsersIcon,
    LinkIcon,
    StarIcon,
    ArrowRightIcon,
    PencilIcon,
    DocumentDuplicateIcon,
    ArrowDownTrayIcon,
    TrashIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
    FolderOpenIcon,
    ArrowPathIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType } from 'react';
import type { MediaFile } from '@/types';

interface ContextMenuProps {
    show: boolean;
    x: number;
    y: number;
    file?: Partial<MediaFile>;
    onClose: () => void;
    onUploadFiles?: () => void;
    onUploadFolder?: () => void;
}

type IconColor = 'brand' | 'green' | 'amber' | 'sky' | 'rose' | 'violet' | 'gray';

interface MenuItem {
    title: string;
    Icon: ComponentType<{ className?: string }>;
    iconColor: IconColor;
    group: string;
    show: string;
    action: () => void;
}

const iconColorClasses: Record<IconColor, { icon: string; bg: string }> = {
    brand:  { icon: 'text-brand-500',  bg: 'bg-brand-50 group-hover:bg-brand-100' },
    green:  { icon: 'text-emerald-500', bg: 'bg-emerald-50 group-hover:bg-emerald-100' },
    amber:  { icon: 'text-amber-500',   bg: 'bg-amber-50 group-hover:bg-amber-100' },
    sky:    { icon: 'text-sky-500',      bg: 'bg-sky-50 group-hover:bg-sky-100' },
    rose:   { icon: 'text-rose-500',     bg: 'bg-rose-50 group-hover:bg-rose-100' },
    violet: { icon: 'text-violet-500',   bg: 'bg-violet-50 group-hover:bg-violet-100' },
    gray:   { icon: 'text-gray-500',     bg: 'bg-gray-100 group-hover:bg-gray-200' },
};

export default function ContextMenu({ show, x, y, file, onClose, onUploadFiles, onUploadFolder }: ContextMenuProps) {
    const store = useMediaStore();
    const location = useLocation();
    const menuRef = useRef<HTMLDivElement>(null);
    const selectedFilesId = store.selectedFilesId;
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [animClass, setAnimClass] = useState('opacity-0');
    const prevShowRef = useRef<{ x: number; y: number } | null>(null);

    const manageStar = () => {
        if (file?.id === undefined) return;
        if (file.stared) {
            store.removeStar(selectedFilesId);
        } else {
            store.addStar(selectedFilesId);
        }
    };

    const menuitems: MenuItem[] = [
        { title: 'Preview',            Icon: EyeIcon,               iconColor: 'brand',  group: 'view',    show: 'items', action: () => store.setPreviewModal(true) },
        { title: 'Share',              Icon: UsersIcon,             iconColor: 'sky',    group: 'share',   show: 'items', action: () => store.setShareFileModal(true) },
        { title: 'Get shareable link', Icon: LinkIcon,              iconColor: 'sky',    group: 'share',   show: 'items', action: () => store.setShareLinkModal(true) },
        { title: file?.stared ? 'Remove star' : 'Add star', Icon: StarIcon, iconColor: 'amber', group: 'share', show: 'items', action: manageStar },
        { title: 'Move to',            Icon: ArrowRightIcon,        iconColor: 'violet', group: 'edit',    show: 'items', action: () => store.setMoveToModal(true) },
        { title: 'Rename',             Icon: PencilIcon,            iconColor: 'violet', group: 'edit',    show: 'items', action: () => store.setRenameFileModal(true) },
        { title: 'Make a copy',        Icon: DocumentDuplicateIcon, iconColor: 'green',  group: 'edit',    show: 'items', action: () => store.copyFile(selectedFilesId) },
        { title: 'Download',           Icon: ArrowDownTrayIcon,     iconColor: 'green',  group: 'edit',    show: 'items', action: () => store.downloadFile(selectedFilesId) },
        { title: 'Delete',             Icon: TrashIcon,             iconColor: 'rose',   group: 'danger',  show: 'items', action: () => store.deleteItem({ ids: selectedFilesId }) },
        { title: 'New Folder',         Icon: FolderPlusIcon,        iconColor: 'brand',  group: 'create',  show: 'back',  action: () => store.setNewFolderModal(true) },
        { title: 'Upload files',       Icon: ArrowUpTrayIcon,       iconColor: 'green',  group: 'upload',  show: 'back',  action: () => onUploadFiles?.() },
        { title: 'Upload Folder',      Icon: FolderOpenIcon,        iconColor: 'amber',  group: 'upload',  show: 'back',  action: () => onUploadFolder?.() },
        { title: 'Restore files',      Icon: ArrowPathIcon,         iconColor: 'green',  group: 'trash-a', show: 'trash', action: () => store.deleteItem({ ids: selectedFilesId, action: 'restore' }) },
        { title: 'Delete Forever',     Icon: XCircleIcon,           iconColor: 'rose',   group: 'trash-b', show: 'trash', action: () => store.deleteItem({ ids: selectedFilesId, action: 'deleteforever' }) },
    ];

    const pathname = location.pathname;
    const items = (() => {
        if (file?.id !== undefined && file.deleted_at === null) {
            const fileItems = menuitems.filter((i) => i.show === 'items');
            return file.type === 'folder' ? fileItems.filter((i) => i.title !== 'Preview') : fileItems;
        } else if (file?.id !== undefined && file.deleted_at !== null) {
            return menuitems.filter((i) => i.show === 'trash');
        } else if (pathname === '/media' || pathname.startsWith('/media/folder')) {
            return menuitems.filter((i) => i.show === 'back');
        }
        return [];
    })();

    // Group items with dividers
    const grouped: (MenuItem | 'divider')[] = [];
    let lastGroup = '';
    items.forEach((item) => {
        if (lastGroup && item.group !== lastGroup) grouped.push('divider');
        grouped.push(item);
        lastGroup = item.group;
    });

    const openMenu = useCallback((rawX: number, rawY: number) => {
        setPos({ x: rawX, y: rawY });
        setAnimClass('opacity-0');
        requestAnimationFrame(() => {
            const el = menuRef.current;
            if (el) {
                const rect = el.getBoundingClientRect();
                let ax = rawX, ay = rawY;
                if (rawX + rect.width > window.innerWidth - 8) ax = window.innerWidth - rect.width - 8;
                if (rawY + rect.height > window.innerHeight - 8) ay = window.innerHeight - rect.height - 8;
                if (ax < 8) ax = 8;
                if (ay < 8) ay = 8;
                setPos({ x: ax, y: ay });
            }
            el?.getBoundingClientRect(); // force reflow
            setAnimClass('animate-[fadeInDown_150ms_ease-out_forwards]');
            setVisible(true);
        });
    }, []);

    useEffect(() => {
        if (!show || items.length === 0) {
            if (visible) {
                setAnimClass('animate-[fadeOutUp_100ms_ease-in_forwards]');
                const timer = setTimeout(() => {
                    setVisible(false);
                    setAnimClass('opacity-0');
                    prevShowRef.current = null;
                }, 100);
                return () => clearTimeout(timer);
            }
            return;
        }

        const prev = prevShowRef.current;
        const posChanged = prev && (prev.x !== x || prev.y !== y);

        if (visible && posChanged) {
            // Close first, then reopen at new position
            setAnimClass('animate-[fadeOutUp_100ms_ease-in_forwards]');
            const timer = setTimeout(() => {
                prevShowRef.current = { x, y };
                openMenu(x, y);
            }, 100);
            return () => clearTimeout(timer);
        }

        // Fresh open
        prevShowRef.current = { x, y };
        openMenu(x, y);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show, x, y]);

    // Close on any outside click (but don't block the event from reaching elements below)
    useEffect(() => {
        if (!visible) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [visible, onClose]);

    // Keyboard navigation
    useEffect(() => {
        if (!show) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [show, onClose]);

    if (!visible && (!show || items.length === 0)) return null;

    return createPortal(
        <div
            ref={menuRef}
            className={`fixed z-50 w-52 rounded-xl border border-gray-200/80 bg-white/95 py-1 shadow-2xl backdrop-blur-xl ${animClass}`}
            style={{ left: pos.x, top: pos.y }}
        >
                {grouped.map((entry, index) =>
                    entry === 'divider' ? (
                        <div key={`d-${index}`} className="my-1 border-t border-gray-100" />
                    ) : (
                        <button
                            key={index}
                            className="group flex w-full items-center gap-2.5 px-2 py-1.5 text-[13px] text-gray-700 transition-colors duration-150 hover:bg-gray-50 active:bg-gray-100"
                            style={{ animationDelay: `${index * 25}ms` }}
                            onClick={() => { entry.action(); onClose(); }}
                        >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${iconColorClasses[entry.iconColor].bg}`}>
                                <entry.Icon className={`h-4 w-4 transition-transform duration-150 group-hover:scale-110 ${iconColorClasses[entry.iconColor].icon}`} />
                            </span>
                            <span className="truncate font-medium">{entry.title}</span>
                        </button>
                    )
                )}
            </div>,
        document.body
    );
}
