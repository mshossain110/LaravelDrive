import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useMediaStore } from '@/stores/mediaStore';
import { getFileIcon, getFileIconColor, isImageType } from './fileUtils';
import type { MediaFile } from '@/types';

interface MediaItemProps {
    media: MediaFile;
}

export default function MediaItem({ media }: MediaItemProps) {
    const selectedFilesId = useMediaStore((s) => s.selectedFilesId);
    const isSelected = selectedFilesId.includes(media.id);

    const FileIcon = getFileIcon(media.extension, media.type);
    const iconColor = getFileIconColor(media.extension, media.type);
    const isImage = isImageType(media.extension);

    return (
        <div className={`group relative w-full cursor-pointer select-none ${isSelected ? 'ring-2 ring-brand-500 rounded-lg' : ''}`}>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
                {/* Thumbnail area */}
                <div className="relative flex h-[166px] items-center justify-center bg-gray-50">
                    {isImage ? (
                        <img
                            src={media.public_path}
                            alt={media.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <FileIcon className={`h-16 w-16 ${iconColor}`} />
                        </div>
                    )}

                    {/* Star badge */}
                    {media.stared && (
                        <StarIconSolid className="absolute right-2 top-2 h-5 w-5 text-amber-400 drop-shadow" />
                    )}
                </div>

                {/* Name bar */}
                <div className="flex items-center gap-2 border-t border-gray-100 px-3 py-2.5">
                    <FileIcon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                    <span className="truncate text-sm text-gray-700">{media.name}</span>
                </div>
            </div>
        </div>
    );
}
