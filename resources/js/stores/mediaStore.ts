import { create } from 'zustand';
import api from '@/lib/axios';
import type { MediaFile, Folder, Pagination } from '@/types';
import { useAppStore } from './appStore';

function getNestedFolders(arr: Folder[], parent = 0): Folder[] {
    const out: Folder[] = [];
    (arr || []).forEach((e, i) => {
        if (e.parent_id === parent) {
            const children = getNestedFolders(arr.slice(i + 1), e.id);
            out.push({ ...e, children });
        }
    });
    return out;
}

interface ContextMenu {
    show: boolean;
    x: number;
    y: number;
    file?: MediaFile;
}

interface MediaState {
    mediaItems: MediaFile[];
    folders: Folder[];
    pagination: Pagination;
    trashItems: MediaFile[];
    trashPagination: Pagination;
    staredItems: MediaFile[];
    staredPagination: Pagination;
    sharedItems: MediaFile[];
    sharedPagination: Pagination;
    fileInfoSideBar: boolean;
    newFolderModal: boolean;
    shareFileModal: boolean;
    shareLinkModal: boolean;
    renameFileModal: boolean;
    moveToModal: boolean;
    previewModal: boolean;
    selectedMedia: Partial<MediaFile>;
    selectedFilesId: number[];
    contextMenu: ContextMenu;

    // Actions
    setMediaItems: (items: MediaFile[], append?: boolean) => void;
    emptyMediaItems: () => void;
    setPagination: (p: Pagination) => void;
    setFolders: (folders: Folder[]) => void;
    addFolderToList: (folder: MediaFile) => void;
    toggleSidebar: (val?: boolean | null) => void;
    selectMediaItem: (item: Partial<MediaFile>) => void;
    selectFiles: (id: number, isMultiSelect: boolean) => void;
    deselectFile: () => void;
    setNewFolderModal: (v: boolean) => void;
    setShareFileModal: (v: boolean) => void;
    setShareLinkModal: (v: boolean) => void;
    setRenameFileModal: (v: boolean) => void;
    setMoveToModal: (v: boolean) => void;
    setPreviewModal: (v: boolean) => void;
    setContextMenu: (cm: ContextMenu) => void;
    addStarLocal: (ids: number[]) => void;
    removeStarLocal: (ids: number[]) => void;
    updateItemLocal: (item: MediaFile) => void;
    deleteItemLocal: (ids: number[]) => void;
    copyFileLocal: (items: MediaFile[]) => void;
    moveFileLocal: (ids: number[]) => void;

    // Trash
    setTrashItems: (items: MediaFile[], append?: boolean) => void;
    emptyTrashItems: () => void;
    setTrashPagination: (p: Pagination) => void;

    // Starred
    setStaredItems: (items: MediaFile[], append?: boolean) => void;
    emptyStaredItems: () => void;
    setStaredPagination: (p: Pagination) => void;

    // Shared
    setSharedItems: (items: MediaFile[], append?: boolean) => void;
    emptySharedItems: () => void;
    setSharedPagination: (p: Pagination) => void;

    // Computed-like
    getNestedFolders: () => Folder[];
    getFavoriteFolders: () => Folder[];

    // Async actions
    fetchMediaItems: (params: Record<string, unknown>) => Promise<void>;
    updateItem: (params: { id: number; name?: string }) => Promise<MediaFile>;
    deleteItem: (params: { ids: number[]; action?: string }) => Promise<void>;
    fetchFolders: () => Promise<void>;
    addFolder: (params: { name: string; parent_id: number }) => Promise<void>;
    addStar: (ids: number[]) => Promise<void>;
    removeStar: (ids: number[]) => Promise<void>;
    copyFile: (ids: number[]) => Promise<void>;
    downloadFile: (ids: number[]) => Promise<void>;
    fetchTrashItems: (params: Record<string, unknown>) => Promise<void>;
    fetchStaredItems: (params: Record<string, unknown>) => Promise<void>;
    fetchSharedItems: (params: Record<string, unknown>) => Promise<void>;
    moveFiles: (files: number[], destination: number | null) => Promise<MediaFile[]>;
}

const showError = (error: unknown) => {
    const err = error as { response?: { data?: { message?: string }; status?: number } };
    if (err?.response?.data?.message) {
        useAppStore.getState().setSnackbar({
            message: err.response.data.message,
            color: 'error',
            show: true,
        });
    }
};

export const useMediaStore = create<MediaState>((set, get) => ({
    mediaItems: [],
    folders: [],
    pagination: {},
    trashItems: [],
    trashPagination: {},
    staredItems: [],
    staredPagination: {},
    sharedItems: [],
    sharedPagination: {},
    fileInfoSideBar: false,
    newFolderModal: false,
    shareFileModal: false,
    shareLinkModal: false,
    renameFileModal: false,
    moveToModal: false,
    previewModal: false,
    selectedMedia: {},
    selectedFilesId: [],
    contextMenu: { show: false, x: 0, y: 0 },

    // Mutations
    setMediaItems: (items, append = false) =>
        set((s) => ({ mediaItems: append ? [...s.mediaItems, ...items] : items })),
    emptyMediaItems: () => set({ mediaItems: [] }),
    setPagination: (p) => set({ pagination: p }),
    setFolders: (folders) => set({ folders }),
    addFolderToList: (folder) =>
        set((s) => ({
            mediaItems: [folder, ...s.mediaItems],
            folders: [{ id: folder.id, name: folder.name, hash: folder.hash, parent_id: folder.parent_id, stared: false }, ...s.folders],
        })),
    toggleSidebar: (val) =>
        set((s) => ({ fileInfoSideBar: val ?? !s.fileInfoSideBar })),
    selectMediaItem: (item) => set({ selectedMedia: item }),
    selectFiles: (id, isMultiSelect) =>
        set((s) => ({
            selectedFilesId: isMultiSelect ? [...s.selectedFilesId, id] : [id],
        })),
    deselectFile: () => set({ selectedFilesId: [], selectedMedia: {} }),
    setNewFolderModal: (v) => set({ newFolderModal: v }),
    setShareFileModal: (v) => set({ shareFileModal: v }),
    setShareLinkModal: (v) => set({ shareLinkModal: v }),
    setRenameFileModal: (v) => set({ renameFileModal: v }),
    setMoveToModal: (v) => set({ moveToModal: v }),
    setPreviewModal: (v) => set({ previewModal: v }),
    setContextMenu: (cm) => set({ contextMenu: cm }),
    addStarLocal: (ids) =>
        set((s) => ({
            mediaItems: s.mediaItems.map((item) =>
                ids.includes(item.id) ? { ...item, stared: true } : item
            ),
        })),
    removeStarLocal: (ids) =>
        set((s) => ({
            mediaItems: s.mediaItems.map((item) =>
                ids.includes(item.id) ? { ...item, stared: false } : item
            ),
        })),
    updateItemLocal: (item) =>
        set((s) => ({
            mediaItems: s.mediaItems.map((m) => (m.id === item.id ? item : m)),
        })),
    deleteItemLocal: (ids) =>
        set((s) => ({
            mediaItems: s.mediaItems.filter((m) => !ids.includes(m.id)),
        })),
    copyFileLocal: (items) =>
        set((s) => ({ mediaItems: [...s.mediaItems, ...items] })),
    moveFileLocal: (ids) =>
        set((s) => ({ mediaItems: s.mediaItems.filter((m) => !ids.includes(m.id)) })),

    // Trash
    setTrashItems: (items, append = false) =>
        set((s) => ({ trashItems: append ? [...s.trashItems, ...items] : items })),
    emptyTrashItems: () => set({ trashItems: [] }),
    setTrashPagination: (p) => set({ trashPagination: p }),

    // Starred
    setStaredItems: (items, append = false) =>
        set((s) => ({ staredItems: append ? [...s.staredItems, ...items] : items })),
    emptyStaredItems: () => set({ staredItems: [] }),
    setStaredPagination: (p) => set({ staredPagination: p }),

    // Shared
    setSharedItems: (items, append = false) =>
        set((s) => ({ sharedItems: append ? [...s.sharedItems, ...items] : items })),
    emptySharedItems: () => set({ sharedItems: [] }),
    setSharedPagination: (p) => set({ sharedPagination: p }),

    // Computed-like
    getNestedFolders: () => getNestedFolders(get().folders, 0),
    getFavoriteFolders: () => get().folders.filter((f) => f.stared),

    // Async actions
    fetchMediaItems: async (params) => {
        if (!params.page) get().emptyMediaItems();
        try {
            const res = await api.get('/api/file', { params });
            get().setMediaItems(res.data.data, !!params.page);
            get().setPagination(res.data.meta);
        } catch (error) {
            showError(error);
        }
    },

    updateItem: async (params) => {
        const res = await api.put(`/api/file/${params.id}`, params);
        get().updateItemLocal(res.data);
        return res.data;
    },

    deleteItem: async (params) => {
        await api.delete('/api/file/delete', { params });
        get().deleteItemLocal(params.ids);
    },

    fetchFolders: async () => {
        const res = await api.get('/api/folder');
        get().setFolders(res.data.data);
    },

    addFolder: async (params) => {
        const res = await api.post('/api/folder', params);
        get().addFolderToList(res.data.data);
    },

    addStar: async (ids) => {
        await api.post('/api/tag/star', { ids });
        get().addStarLocal(ids);
    },

    removeStar: async (ids) => {
        await api.post('/api/tag/unstar', { ids });
        get().removeStarLocal(ids);
    },

    copyFile: async (ids) => {
        const res = await api.post('/api/file/copy', { ids });
        get().copyFileLocal(res.data.data);
    },

    downloadFile: async (ids) => {
        const res = await api.post('/api/download', { ids }, { responseType: 'blob' });
        let filename = '';
        const disposition = res.headers['content-disposition'];
        if (disposition) {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
            if (matches?.[1]) filename = matches[1].replaceAll(/['"]/g, '');
        }
        const blob = res.data;
        const downloadUrl = globalThis.URL.createObjectURL(blob);
        if (filename) {
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.target = '_blank';
            a.click();
            a.remove();
        } else {
            globalThis.location.href = downloadUrl;
        }
    },

    fetchTrashItems: async (params) => {
        if (!params.page) get().emptyTrashItems();
        try {
            const res = await api.get('/api/file/trash', { params });
            get().setTrashItems(res.data.data, !!params.page);
            get().setTrashPagination(res.data.meta.pagination);
        } catch (error) {
            showError(error);
        }
    },

    fetchStaredItems: async (params) => {
        if (!params.page) get().emptyStaredItems();
        try {
            const res = await api.get('/api/file/star', { params });
            get().setStaredItems(res.data.data, !!params.page);
            get().setStaredPagination(res.data.meta.pagination);
        } catch (error) {
            showError(error);
        }
    },

    fetchSharedItems: async (params) => {
        if (!params.page) get().emptySharedItems();
        try {
            const res = await api.get('/api/shared/files', { params });
            get().setSharedItems(res.data.data, !!params.page);
            get().setSharedPagination(res.data.meta.pagination);
        } catch (error) {
            showError(error);
        }
    },

    moveFiles: async (files, destination) => {
        const res = await api.post('/api/file/move', { files, destination });
        return res.data.data;
    },
}));
