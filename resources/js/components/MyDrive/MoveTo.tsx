import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaStore } from '@/stores/mediaStore';
import AppModal from '@/components/UI/AppModal';
import { FolderIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { Folder } from '@/types';

interface MoveToProps {
    open: boolean;
}

function FolderNode({
    folder,
    selectedFolder,
    onSelect,
    depth = 0,
}: {
    folder: Folder;
    selectedFolder: number | null;
    onSelect: (id: number) => void;
    depth?: number;
}) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = folder.children && folder.children.length > 0;

    return (
        <li className="list-none">
            <div
                className={`flex items-center gap-1 rounded-lg transition-colors ${
                    selectedFolder === folder.id ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
            >
                {hasChildren ? (
                    <button
                        type="button"
                        className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                        onClick={() => setExpanded(!expanded)}
                    >
                        <ChevronRightIcon className={`h-3.5 w-3.5 transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`} />
                    </button>
                ) : (
                    <span className="w-[22px] shrink-0" />
                )}
                <button
                    type="button"
                    className={`flex flex-1 items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                        selectedFolder === folder.id ? 'font-medium' : ''
                    }`}
                    onClick={() => onSelect(folder.id)}
                >
                    <FolderIcon className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="truncate">{folder.name}</span>
                </button>
            </div>
            {hasChildren && expanded && (
                <ul className="mt-0.5 space-y-0.5">
                    {folder.children!.map((child) => (
                        <FolderNode
                            key={child.id}
                            folder={child}
                            selectedFolder={selectedFolder}
                            onSelect={onSelect}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function MoveTo({ open }: MoveToProps) {
    const { folderId } = useParams();
    const store = useMediaStore();
    const folders = useMediaStore((s) => s.folders);
    const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
    const [folderLists, setFolderLists] = useState<Folder[]>([]);

    useEffect(() => {
        const nested = useMediaStore.getState().getNestedFolders();
        const list = [...nested];
        if (folderId) {
            list.unshift({ id: 0, name: 'Root', parent_id: 0, hash: '', stared: false });
        }
        setFolderLists(list);
    }, [folders, folderId]);

    const close = () => store.setMoveToModal(false);

    const moveIntoFolder = () => {
        store.moveFiles(store.selectedFilesId, selectedFolder).then((res) => {
            const parentId = folderId || '0';
            const items = res.filter((i) => String(i.parent_id) !== parentId).map((i) => i.id);
            store.moveFileLocal(items);
            close();
        });
    };

    return (
        <AppModal open={open} onClose={close} title="Move To" maxWidth="sm">
            <div className="max-h-72 overflow-y-auto px-4 py-3">
                <ul className="space-y-0.5 pl-0">
                    {folderLists.map((folder) => (
                        <FolderNode
                            key={folder.id}
                            folder={folder}
                            selectedFolder={selectedFolder}
                            onSelect={setSelectedFolder}
                        />
                    ))}
                </ul>
                {!folderLists.length && <p className="py-4 text-center text-sm text-gray-400">No folders available</p>}
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={close}>Cancel</button>
                <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700" onClick={moveIntoFolder}>Move To</button>
            </div>
        </AppModal>
    );
}
