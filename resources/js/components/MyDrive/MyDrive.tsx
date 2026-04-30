import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useMediaStore } from '@/stores/mediaStore';
import MediaToolbar from './MediaToolbar';
import MediaItem from './MediaItem';
import MediaInfo from './MediaInfo';
import FileUploader from './FileUploader';
import ContextMenu from './ContextMenu';
import NewFolderForm from './NewFolderForm';
import ShareFile from './ShareFile';
import ShareLink from './ShareLink';
import RenameFile from './RenameFile';
import MoveTo from './MoveTo';
import Preview from './Preview';
import type { MediaFile } from '@/types';

export default function MyDrive() {
    const { folderId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const store = useMediaStore();

    const [isFilesLoaded, setIsFilesLoaded] = useState(false);
    const [isFolderLoaded, setIsFolderLoaded] = useState(false);
    const [fileUploader, setFileUploader] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [clickedOnItem, setClickedOnItem] = useState(false);
    const [cm, setCm] = useState<{ show: boolean; x: number; y: number; file?: Partial<MediaFile> }>({ show: false, x: 0, y: 0 });
    const fileCmRef = useRef(false);

    const { mediaItems, pagination, fileInfoSideBar, newFolderModal, shareFileModal, shareLinkModal, renameFileModal, moveToModal, previewModal, folders } = store;

    const currentFolderId = (() => {
        if (!folderId) return 0;
        const f = folders.find((m) => m.hash === folderId);
        return f ? f.id : 0;
    })();

    const isLoaded = isFilesLoaded && isFolderLoaded;

    // Load media items
    const loadMediaItems = useCallback(() => {
        const params: Record<string, unknown> = {};
        if (folderId) params.parent_id = folderId;
        const page = searchParams.get('page');
        if (page) params.page = Number(page);
        store.fetchMediaItems(params).then(() => {
            setIsFilesLoaded(true);
            setScrollLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folderId, searchParams]);

    // Load folders
    useEffect(() => {
        store.fetchFolders().then(() => setIsFolderLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadMediaItems();
    }, [loadMediaItems]);

    // Cleanup on unmount
    useEffect(() => {
        return () => { useMediaStore.getState().emptyMediaItems(); };
    }, []);

    // Deselect on outside click
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('.file-deselet')) return;
            if (!clickedOnItem) store.deselectFile();
            setClickedOnItem(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedOnItem]);

    // Infinite scroll
    useEffect(() => {
        const handler = () => {
            if (scrollLoading) return;
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;
            if (bottomOfWindow) {
                const currentPage = Number(searchParams.get('page') || 1);
                const nextPage = currentPage + 1;
                if (pagination.total_pages && nextPage > pagination.total_pages) return;
                setScrollLoading(true);
                const params = new URLSearchParams(searchParams);
                params.set('page', String(nextPage));
                navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            }
        };
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, [scrollLoading, searchParams, pagination, navigate, location.pathname]);

    const showContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (fileCmRef.current) { fileCmRef.current = false; return; }
        setCm({ show: true, x: e.clientX, y: e.clientY });
    };

    const showContextMenu2 = (e: React.MouseEvent, item: MediaFile) => {
        e.preventDefault();
        fileCmRef.current = true;
        setCm({ show: true, x: e.clientX, y: e.clientY, file: item });
        onClickItem(e, item);
    };

    const onClickItem = (event: React.MouseEvent | React.TouchEvent, item: MediaFile) => {
        setClickedOnItem(true);
        const isMultiSelect = 'ctrlKey' in event && (event.ctrlKey || event.metaKey);
        if (!isMultiSelect && item.type === 'folder' && !fileCmRef.current) {
            let name = '/media/folder/' + item.hash;
            if (location.pathname.includes('trash')) {
                name = '/media/trash/' + item.hash;
            }
            navigate(name);
        }
        store.selectFiles(item.id, !!isMultiSelect);
        store.selectMediaItem(item);
    };

    return (
        <div>
            <MediaToolbar
                onOpenDropZone={() => setFileUploader(true)}
                onUploadFolder={() => setFileUploader(true)}
            />

            {isLoaded ? (
                <div
                    className={`relative mt-4 ${fileInfoSideBar ? 'mr-80' : ''}`}
                    onDragEnter={(e) => { e.stopPropagation(); e.preventDefault(); setFileUploader(true); }}
                    onContextMenu={showContextMenu}
                >
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {mediaItems.map((img) => (
                            <div
                                key={img.id}
                                onContextMenu={(e) => showContextMenu2(e, img)}
                                onClick={(e) => onClickItem(e, img)}
                                onTouchStart={(e) => onClickItem(e, img)}
                            >
                                <MediaItem media={img} />
                            </div>
                        ))}
                    </div>

                    {!mediaItems.length && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <p className="text-sm text-gray-500">This folder is empty</p>
                            <p className="mt-1 text-xs text-gray-400">Drop files here or use the toolbar to upload</p>
                        </div>
                    )}

                    {fileInfoSideBar && <MediaInfo />}
                    <FileUploader active={fileUploader} onDeactivate={() => setFileUploader(false)} currentFolderId={currentFolderId} />
                    <ContextMenu
                        show={cm.show}
                        x={cm.x}
                        y={cm.y}
                        file={cm.file}
                        onClose={() => setCm({ show: false, x: 0, y: 0 })}
                        onOpenDropZone={() => setFileUploader(true)}
                        onUploadFolder={() => setFileUploader(true)}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center py-20">
                    <svg className="h-8 w-8 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                </div>
            )}

            {newFolderModal && <NewFolderForm open={newFolderModal} />}
            {shareFileModal && <ShareFile open={shareFileModal} />}
            {shareLinkModal && <ShareLink open={shareLinkModal} />}
            {renameFileModal && <RenameFile open={renameFileModal} />}
            {moveToModal && <MoveTo open={moveToModal} />}
            {previewModal && <Preview open={previewModal} />}
        </div>
    );
}
