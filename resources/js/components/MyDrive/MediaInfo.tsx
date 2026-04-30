import { useState } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import {
    FolderIcon,
    DocumentIcon,
    DocumentTextIcon,
    PhotoIcon,
    FilmIcon,
    MusicalNoteIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import type { ComponentType } from 'react';

const imageTypes = ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'];

export default function MediaInfo() {
    const [tabActive, setTabActive] = useState(1);
    const selectedMedia = useMediaStore((s) => s.selectedMedia);

    const hasItem = selectedMedia?.id !== undefined;

    const isImageFile = hasItem && imageTypes.includes(selectedMedia.extension || '');

    const getIcon = (): ComponentType<{ className?: string }> => {
        const ext = selectedMedia?.extension || '';
        const type = selectedMedia?.type || '';
        if (type === 'folder') return FolderIcon;
        if (imageTypes.includes(ext)) return PhotoIcon;
        if (['pdf', 'txt', 'doc', 'docx'].includes(ext)) return DocumentTextIcon;
        if (['mp4', 'webm', 'mov'].includes(ext)) return FilmIcon;
        if (['mp3', 'ogg'].includes(ext)) return MusicalNoteIcon;
        if (['zip', 'rar', '7z'].includes(ext)) return ArchiveBoxIcon;
        return DocumentIcon;
    };

    const getIconColor = (): string => {
        const ext = selectedMedia?.extension || '';
        const type = selectedMedia?.type || '';
        if (type === 'folder') return 'text-amber-500';
        if (imageTypes.includes(ext)) return 'text-emerald-500';
        if (['pdf'].includes(ext)) return 'text-red-500';
        return 'text-gray-400';
    };

    const Icon = getIcon();

    const details = hasItem
        ? [
              { label: 'File Name', value: selectedMedia.name },
              { label: 'Type', value: selectedMedia.type },
              { label: 'Size', value: selectedMedia.file_size },
              { label: 'Storage Used', value: selectedMedia.file_size },
              { label: 'Location', value: selectedMedia.url },
              { label: 'Owner', value: selectedMedia.file_name },
              { label: 'Created', value: selectedMedia.created_at?.date },
              { label: 'Modified', value: selectedMedia.updated_at?.date },
              { label: 'Description', value: selectedMedia.description },
          ].filter((d) => d.value)
        : [];

    return (
        <aside className="absolute inset-y-0 right-0 z-10 w-80 border-l border-gray-200 bg-white shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
                {hasItem ? (
                    <>
                        <Icon className={`h-5 w-5 shrink-0 ${getIconColor()}`} />
                        <h3 className="truncate text-sm font-semibold text-gray-900">{selectedMedia.name}</h3>
                    </>
                ) : (
                    <>
                        <FolderIcon className="h-5 w-5 text-amber-500" />
                        <h3 className="text-sm font-semibold text-gray-900">My Files</h3>
                    </>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors ${tabActive === 1 ? 'border-b-2 border-brand-600 text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setTabActive(1)}
                >
                    Details
                </button>
                <button
                    className={`flex-1 py-2.5 text-center text-xs font-medium transition-colors ${tabActive === 2 ? 'border-b-2 border-brand-600 text-brand-700' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setTabActive(2)}
                >
                    Activities
                </button>
            </div>

            {hasItem ? (
                <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(100% - 110px)' }}>
                    {isImageFile && (
                        <img
                            src={selectedMedia.public_path}
                            alt={selectedMedia.name}
                            className="mb-4 w-full rounded-lg object-cover"
                            loading="lazy"
                        />
                    )}
                    <dl className="space-y-3">
                        {details.map((detail) => (
                            <div key={detail.label} className="flex gap-3">
                                <dt className="w-24 shrink-0 text-xs text-gray-500">{detail.label}</dt>
                                <dd className="break-all text-xs text-gray-900">{detail.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                    <DocumentIcon className="mb-3 h-12 w-12 text-gray-300" />
                    <p className="text-sm text-gray-500">Select a file or folder to view its details.</p>
                </div>
            )}
        </aside>
    );
}
