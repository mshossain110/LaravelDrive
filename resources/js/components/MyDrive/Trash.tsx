import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useMediaStore } from '@/stores/mediaStore';
import MediaItem from './MediaItem';
import MediaInfo from './MediaInfo';
import ContextMenu from './ContextMenu';
import type { MediaFile } from '@/types';

export default function Trash() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const store = useMediaStore();

    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const [clickedOnItem, setClickedOnItem] = useState(false);
    const [cm, setCm] = useState<{ show: boolean; x: number; y: number; file?: Partial<MediaFile> }>({ show: false, x: 0, y: 0 });
    const fileCmRef = useRef(false);

    const { trashItems, trashPagination } = store;

    const loadItems = useCallback(() => {
        const params: Record<string, unknown> = {};
        const page = searchParams.get('page');
        if (page) params.page = Number(page);
        store.fetchTrashItems(params).then(() => {
            setIsLoaded(true);
            setScrollLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    useEffect(() => { loadItems(); }, [loadItems]);
    useEffect(() => { return () => { useMediaStore.getState().emptyTrashItems(); }; }, []);

    useEffect(() => {
        const handler = () => {
            if (scrollLoading) return;
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 > document.documentElement.offsetHeight;
            if (bottomOfWindow) {
                const currentPage = Number(searchParams.get('page') || 1);
                const nextPage = currentPage + 1;
                if (trashPagination.total_pages && nextPage > trashPagination.total_pages) return;
                setScrollLoading(true);
                const params = new URLSearchParams(searchParams);
                params.set('page', String(nextPage));
                navigate(`${location.pathname}?${params.toString()}`, { replace: true });
            }
        };
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, [scrollLoading, searchParams, trashPagination, navigate, location.pathname]);

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
            navigate(`/media/trash/${item.hash}`);
        }
        store.selectFiles(item.id, !!isMultiSelect);
        store.selectMediaItem(item);
    };

    return (
        <div>
            {isLoaded ? (
                <div className="relative mt-4" onContextMenu={showContextMenu}>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {trashItems.map((img) => (
                            <div key={img.id} onContextMenu={(e) => showContextMenu2(e, img)} onClick={(e) => onClickItem(e, img)} onTouchStart={(e) => onClickItem(e, img)}>
                                <MediaItem media={img} />
                            </div>
                        ))}
                    </div>
                    {!trashItems.length && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <p className="text-sm text-gray-500">Trash is empty</p>
                        </div>
                    )}
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
        </div>
    );
}
