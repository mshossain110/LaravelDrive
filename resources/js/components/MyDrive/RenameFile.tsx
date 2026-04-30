import { useState, useEffect } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import AppModal from '@/components/UI/AppModal';

interface RenameFileProps {
    open: boolean;
}

export default function RenameFile({ open }: RenameFileProps) {
    const selectedMedia = useMediaStore((s) => s.selectedMedia);
    const updateItem = useMediaStore((s) => s.updateItem);
    const setRenameFileModal = useMediaStore((s) => s.setRenameFileModal);
    const [name, setName] = useState(selectedMedia.name || '');

    useEffect(() => {
        setName(selectedMedia.name || '');
    }, [selectedMedia.id, selectedMedia.name]);

    const close = () => setRenameFileModal(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedMedia.id) {
            updateItem({ name, id: selectedMedia.id }).then(() => close());
        }
    };

    return (
        <AppModal open={open} onClose={close} title="Rename File" maxWidth="sm">
            <form onSubmit={onSubmit}>
                <div className="px-6 py-4">
                    <label htmlFor="rename-input" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="rename-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                        minLength={3}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                </div>
                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                    <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={close}>Cancel</button>
                    <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Rename</button>
                </div>
            </form>
        </AppModal>
    );
}
