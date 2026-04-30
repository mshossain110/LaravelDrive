import { useMediaStore } from '@/stores/mediaStore';
import { isImageType, isPdfType, isVideoType, isAudioType } from './fileUtils';
import ContextMenu from './ContextMenu';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface PreviewProps {
    open: boolean;
}

export default function Preview({ open }: PreviewProps) {
    const selectedMedia = useMediaStore((s) => s.selectedMedia);
    const setPreviewModal = useMediaStore((s) => s.setPreviewModal);
    const downloadFile = useMediaStore((s) => s.downloadFile);

    const [showMenu, setShowMenu] = useState(false);
    const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

    if (!open) return null;

    const ext = selectedMedia.extension || '';
    const rawUrl = selectedMedia.url || '';
    const fileUrl = rawUrl.startsWith('http') ? rawUrl : window.location.origin + (rawUrl.startsWith('/') ? '' : '/') + rawUrl;
    const isImage = isImageType(ext);
    const isPdf = isPdfType(ext);
    const isVideo = isVideoType(ext);
    const isAudio = isAudioType(ext);

    const closePreview = () => setPreviewModal(false);

    const handleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.preview-toolbar')) return;
        if (target.closest('.image-preview img')) return;
        if (target.closest('.video-preview')) return;
        closePreview();
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        setShowMenu(!showMenu);
        setMenuPos({ x: e.clientX, y: e.clientY });
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 file-deselet" onClick={handleClick}>
            {/* Toolbar */}
            <div className="preview-toolbar flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
                <button className="rounded-full p-2 hover:bg-white/20" onClick={(e) => { e.stopPropagation(); closePreview(); }}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-full p-2 hover:bg-white/20"
                        onClick={(e) => { e.stopPropagation(); if (selectedMedia.id) downloadFile([selectedMedia.id]); }}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                    <div className="relative">
                        <button className="rounded-full p-2 hover:bg-white/20" onClick={(e) => { e.stopPropagation(); handleContextMenu(e); }}>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        <ContextMenu
                            show={showMenu}
                            x={menuPos.x}
                            y={menuPos.y}
                            file={selectedMedia}
                            onClose={() => setShowMenu(false)}
                        />
                    </div>
                </div>
            </div>

            {/* PDF */}
            {isPdf && (
                <div className="flex-1 bg-white">
                    <object type={selectedMedia.mime} data={fileUrl} className="h-full w-full">
                        <a href={fileUrl} className="text-blue-400 underline">Download the file.</a>
                    </object>
                </div>
            )}

            {/* Image */}
            {isImage && (
                <div className="image-preview flex flex-1 items-center justify-center">
                    <img src={selectedMedia.public_path} className="max-h-[80vh] max-w-full object-contain" alt="Preview" />
                </div>
            )}

            {/* Video */}
            {isVideo && (
                <div className="video-preview flex flex-1 items-center justify-center">
                    <video controls className="max-h-[80vh] max-w-full">
                        <source src={fileUrl} type={selectedMedia.mime} />
                    </video>
                </div>
            )}

            {/* Audio */}
            {isAudio && (
                <div className="video-preview flex flex-1 items-center justify-center">
                    <audio controls>
                        <source src={fileUrl} type={selectedMedia.mime} />
                    </audio>
                </div>
            )}

            {/* No preview */}
            {!isPdf && !isImage && !isVideo && !isAudio && (
                <div className="flex flex-1 items-center justify-center">
                    <div className="rounded-xl bg-white p-8 text-center shadow-lg">
                        <h4 className="mb-4 text-lg font-medium text-gray-700">No file preview available.</h4>
                        <button
                            className="rounded-lg bg-brand-600 px-6 py-2 text-white hover:bg-brand-700"
                            onClick={(e) => { e.stopPropagation(); if (selectedMedia.id) downloadFile([selectedMedia.id]); }}
                        >
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}
