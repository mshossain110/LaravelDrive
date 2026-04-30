import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaStore } from '@/stores/mediaStore';
import AppModal from '@/components/UI/AppModal';

interface NewFolderFormProps {
    open: boolean;
}

export default function NewFolderForm({ open }: NewFolderFormProps) {
    const { folderId } = useParams();
    const folders = useMediaStore((s) => s.folders);
    const addFolder = useMediaStore((s) => s.addFolder);
    const setNewFolderModal = useMediaStore((s) => s.setNewFolderModal);
    const [name, setName] = useState('');

    const currentFolderId = (() => {
        if (!folderId) return 0;
        const f = folders.find((m) => m.hash === folderId);
        return f ? f.id : 0;
    })();

    const close = () => {
        setNewFolderModal(false);
        setName('');
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addFolder({ name, parent_id: currentFolderId }).then(() => close());
    };

    return (
        <AppModal open={open} onClose={close} title="New Folder" maxWidth="sm">
            <form onSubmit={onSubmit}>
                <div className="px-6 py-4">
                    <label htmlFor="folder-name" className="block text-sm font-medium text-gray-700">Folder name</label>
                    <input
                        id="folder-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                        minLength={3}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Enter folder name"
                    />
                </div>
                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                    <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={close}>Cancel</button>
                    <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Create</button>
                </div>
            </form>
        </AppModal>
    );
}
