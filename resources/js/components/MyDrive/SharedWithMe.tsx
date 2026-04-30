import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useMediaStore } from '@/stores/mediaStore';
import MediaItem from './MediaItem';
import MediaInfo from './MediaInfo';
import FileUploader from './FileUploader';
import ContextMenu from './ContextMenu';
import NewFolderForm from './NewFolderForm';
import ShareFile from './ShareFile';
import RenameFile from './RenameFile';
import MoveTo from './MoveTo';
import type { MediaFile } from '@/types';

export default function SharedWithMe() {
    const { folderId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const store = useMediaStore();

    const [isLoaded, setIsLoaded] = useState(false);
    const [fileUploader, setFileUploader] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [clickedOnItem, setClickedOnItem] = useState(false);
    const [cm, setCm] = useState<{ show: boolean; x: number; y: number; file?: Partial<MediaFile> }>({ show: false, x: 0, y: 0 });
    const fileCmRef = useRef(false);

    const { sharedItems, sharedPagination, fileInfoSideBar, newFolderModal, shareFileModal, renameFileModal } = store;

    const loadItems = useCallback(() => {
        const params: Record<string, unknown> = {};
        if (folderId) params.parent_id = folderId;
        const page = searchParams.get('page');
        if (page) params.page = Number(page);
        store.fetchSharedItems(params).then(() => {
            setIsLoaded(true);
            setScrollLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [folderId, searchParams]);

    useEffect(() => { loadItems(); }, [loadItems]);
    useEffect(() => { return () => { useMediaStore.getState().emptySharedItems(); }; }, []);

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if ((event.target as HTMLElement).closest('button.media-info-button')) return;
            if (!clickedOnItem) store.deselectFile();
            setClickedOnItem(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedOnItem]);

    useEffect(() => {
        const handler = () => {
            if (scrollLoading) return;
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;
            if (bottomOfWindow) {
                const currentPage = Number(searchParams.get('page') || 1);
                const nextPage = currentPage + 1;
                if (sharedPagination.total_pages && nextPage > sharedPagination.total_pages) return;
                setScrollLoading(true);
                const params = new URLSearchParams(searchParams);
                params.set('page', String(nextPage));
                navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            }
        };
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, [scrollLoading, searchParams, sharedPagination, navigate, location.pathname]);

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
            navigate(`/media/shared/${item.hash}`);
        }
        store.selectFiles(item.id, !!isMultiSelect);
        store.selectMediaItem(item);
    };

    return (
        <div>
            {isLoaded ? (
                <div className={`relative mt-4 ${fileInfoSideBar ? 'mr-80' : ''}`} onContextMenu={showContextMenu}>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {sharedItems.map((img) => (
                            <div key={img.id} onContextMenu={(e) => showContextMenu2(e, img)} onClick={(e) => onClickItem(e, img)} onTouchStart={(e) => onClickItem(e, img)}>
                                <MediaItem media={img} />
                            </div>
                        ))}
                    </div>
                    {!sharedItems.length && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-sm text-gray-500">No files shared with you</p>
                        </div>
                    )}
                    {fileInfoSideBar && <MediaInfo />}
                    <FileUploader active={fileUploader} onDeactivate={() => setFileUploader(false)} currentFolderId={0} />
                    <ContextMenu show={cm.show} x={cm.x} y={cm.y} file={cm.file} onClose={() => setCm({ show: false, x: 0, y: 0 })} />
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
            {renameFileModal && <RenameFile open={renameFileModal} />}
            <MoveTo open={store.moveToModal} />
        </div>
    );
}
