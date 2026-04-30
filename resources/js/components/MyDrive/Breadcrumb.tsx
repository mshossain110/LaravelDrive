import { useMediaStore } from '@/stores/mediaStore';
import { useParams, Link } from 'react-router-dom';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { Folder } from '@/types';

export default function Breadcrumb() {
    const { folderId } = useParams();
    const folders = useMediaStore((s) => s.folders);

    const buildPath = (): Folder[] => {
        if (!folderId) return [];
        const current = folders.find((f) => f.hash === folderId);
        if (!current) return [];

        const path: Folder[] = [current];
        let parentId = current.parent_id;
        while (parentId) {
            const parent = folders.find((f) => f.id === parentId);
            if (!parent) break;
            path.unshift(parent);
            parentId = parent.parent_id;
        }
        return path;
    };

    const path = buildPath();

    return (
        <nav className="mt-3 flex items-center gap-1 text-sm">
            <Link
                to="/media"
                className="flex items-center gap-1 rounded px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
                <HomeIcon className="h-4 w-4" />
                <span>My Drive</span>
            </Link>
            {path.map((folder) => (
                <span key={folder.id} className="flex items-center gap-1">
                    <ChevronRightIcon className="h-3.5 w-3.5 text-gray-400" />
                    {folder.hash === folderId ? (
                        <span className="rounded px-1.5 py-0.5 font-medium text-gray-900">
                            {folder.name}
                        </span>
                    ) : (
                        <Link
                            to={`/media/folder/${folder.hash}`}
                            className="rounded px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                            {folder.name}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}
