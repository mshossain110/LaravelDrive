import { useState, useEffect, useRef } from 'react';
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
    onOpenDropZone?: () => void;
    onUploadFolder?: () => void;
}

interface MenuItem {
    title: string;
    Icon: ComponentType<{ className?: string }>;
    show: string;
    action: () => void;
}

export default function ContextMenu({ show, x, y, file, onClose, onOpenDropZone, onUploadFolder }: ContextMenuProps) {
    const store = useMediaStore();
    const location = useLocation();
    const selectedFilesId = store.selectedFilesId;

    const manageStar = () => {
        if (file?.id === undefined) return;
        if (file.stared) {
            store.removeStar(selectedFilesId);
        } else {
            store.addStar(selectedFilesId);
        }
    };

    const menuitems: MenuItem[] = [
        { title: 'Preview', Icon: EyeIcon, show: 'items', action: () => store.setPreviewModal(true) },
        { title: 'Share', Icon: UsersIcon, show: 'items', action: () => store.setShareFileModal(true) },
        { title: 'Get shareable link', Icon: LinkIcon, show: 'items', action: () => store.setShareLinkModal(true) },
        { title: file?.stared ? 'Remove from star' : 'Add a star', Icon: StarIcon, show: 'items', action: manageStar },
        { title: 'Move to', Icon: ArrowRightIcon, show: 'items', action: () => store.setMoveToModal(true) },
        { title: 'Rename', Icon: PencilIcon, show: 'items', action: () => store.setRenameFileModal(true) },
        { title: 'Make a copy', Icon: DocumentDuplicateIcon, show: 'items', action: () => store.copyFile(selectedFilesId) },
        { title: 'Download', Icon: ArrowDownTrayIcon, show: 'items', action: () => store.downloadFile(selectedFilesId) },
        { title: 'Delete', Icon: TrashIcon, show: 'items', action: () => store.deleteItem({ ids: selectedFilesId }) },
        { title: 'New Folder', Icon: FolderPlusIcon, show: 'back', action: () => store.setNewFolderModal(true) },
        { title: 'Upload files', Icon: ArrowUpTrayIcon, show: 'back', action: () => onOpenDropZone?.() },
        { title: 'Upload Folder', Icon: FolderOpenIcon, show: 'back', action: () => onUploadFolder?.() },
        { title: 'Restore files', Icon: ArrowPathIcon, show: 'trash', action: () => store.deleteItem({ ids: selectedFilesId, action: 'restore' }) },
        { title: 'Delete Forever', Icon: XCircleIcon, show: 'trash', action: () => store.deleteItem({ ids: selectedFilesId, action: 'deleteforever' }) },
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

    if (!show || items.length === 0) return null;

    return createPortal(
        <>
            <div className="fixed inset-0 z-50" onClick={onClose} />
            <div
                className="fixed z-50 w-56 rounded-lg bg-white py-1.5 shadow-xl ring-1 ring-gray-200"
                style={{ left: x, top: y }}
            >
                {items.map((item, index) => (
                    <button
                        key={index}
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => { item.action(); onClose(); }}
                    >
                        <item.Icon className="h-4 w-4 text-gray-400" />
                        <span>{item.title}</span>
                    </button>
                ))}
            </div>
        </>,
        document.body
    );
}
