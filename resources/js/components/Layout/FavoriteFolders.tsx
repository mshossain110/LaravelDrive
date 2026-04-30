import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { StarIcon, FolderIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMediaStore } from '@/stores/mediaStore';

export default function FavoriteFolders() {
    const [open, setOpen] = useState(false);
    const favoriteFolders = useMediaStore((s) => s.getFavoriteFolders());

    return (
        <div>
            <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                <StarIcon className="h-5 w-5 text-amber-400" />
                <span className="flex-1 text-left">Favorite Folders</span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="mt-1 ml-4 space-y-0.5">
                    {favoriteFolders.map((folder) => (
                        <FolderLink key={folder.id} folder={folder} />
                    ))}
                    {!favoriteFolders.length && (
                        <p className="px-3 py-2 text-xs text-gray-400">No favorites yet</p>
                    )}
                </div>
            )}
        </div>
    );
}

function FolderLink({ folder }: Readonly<{ folder: { id: number; hash: string; name: string } }>) {
    const match = useMatch(`/media/folder/${folder.hash}`);
    return (
        <Link
            to={`/media/folder/${folder.hash}`}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                match
                    ? 'bg-brand-50 font-medium text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            <FolderIcon className="h-5 w-5 text-amber-500" />
            <span className="truncate">{folder.name}</span>
        </Link>
    );
}
