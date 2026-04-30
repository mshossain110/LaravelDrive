import { useState, useRef, useEffect } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import {
    PhotoIcon,
    PlusCircleIcon,
    FolderPlusIcon,
    ArrowUpTrayIcon,
    Squares2X2Icon,
    Bars3BottomLeftIcon,
    FunnelIcon,
    InformationCircleIcon,
    FolderArrowDownIcon,
} from '@heroicons/react/24/outline';

interface MediaToolbarProps {
    onOpenDropZone?: () => void;
    onUploadFolder?: () => void;
}

export default function MediaToolbar({ onOpenDropZone, onUploadFolder }: MediaToolbarProps) {
    const [addMenu, setAddMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const fileInfoSideBar = useMediaStore((s) => s.fileInfoSideBar);
    const toggleSidebar = useMediaStore((s) => s.toggleSidebar);
    const setNewFolderModal = useMediaStore((s) => s.setNewFolderModal);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setAddMenu(false);
            }
        };
        if (addMenu) {
            setTimeout(() => document.addEventListener('click', handler), 0);
            return () => document.removeEventListener('click', handler);
        }
    }, [addMenu]);

    return (
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-1.5">
                <PhotoIcon className="h-5 w-5 text-brand-600" />
                <h2 className="text-sm font-semibold text-gray-900">My Files</h2>

                <div className="relative" ref={menuRef}>
                    <button
                        className="rounded p-1 text-gray-500 hover:bg-gray-100"
                        onClick={() => setAddMenu(!addMenu)}
                    >
                        <PlusCircleIcon className="h-5 w-5" />
                    </button>
                    {addMenu && (
                        <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200">
                            <button
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => { setNewFolderModal(true); setAddMenu(false); }}
                            >
                                <FolderPlusIcon className="h-4 w-4 text-gray-400" />
                                New Folder
                            </button>
                            <button
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => { onUploadFolder?.(); setAddMenu(false); }}
                            >
                                <FolderArrowDownIcon className="h-4 w-4 text-gray-400" />
                                Upload Folder
                            </button>
                            <button
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => { onOpenDropZone?.(); setAddMenu(false); }}
                            >
                                <ArrowUpTrayIcon className="h-4 w-4 text-gray-400" />
                                Upload Files
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1" />

            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Upload files" onClick={onOpenDropZone}>
                <ArrowUpTrayIcon className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="New folder" onClick={() => setNewFolderModal(true)}>
                <FolderPlusIcon className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Grid view">
                <Squares2X2Icon className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="List view">
                <Bars3BottomLeftIcon className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" title="Filter">
                <FunnelIcon className="h-5 w-5" />
            </button>
            <button
                className={`rounded-lg p-2 transition-colors ${fileInfoSideBar ? 'bg-brand-100 text-brand-700' : 'text-gray-500 hover:bg-gray-100'}`}
                title="Info"
                onClick={() => toggleSidebar()}
            >
                <InformationCircleIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
