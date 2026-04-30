import { useState, useEffect, useRef } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import { useUsersStore } from '@/stores/usersStore';
import AppModal from '@/components/UI/AppModal';
import api from '@/lib/axios';

interface ShareFileProps {
    open: boolean;
}

export default function ShareFile({ open }: ShareFileProps) {
    const selectedFilesId = useMediaStore((s) => s.selectedFilesId);
    const selectedMedia = useMediaStore((s) => s.selectedMedia);
    const setShareFileModal = useMediaStore((s) => s.setShareFileModal);
    const searchUsers = useUsersStore((s) => s.searchUsers);

    const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
    const [people, setPeople] = useState<{ id: number; name: string; email: string }[]>([]);
    const [sharedWith, setSharedWith] = useState<{ id: number; display_name: string; email: string; avatar: string }[]>([]);
    const [search, setSearch] = useState('');
    const [permission, setPermission] = useState(1);
    const [showPermMenu, setShowPermMenu] = useState(false);
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>();

    const permissions = [
        { title: 'Can edit', id: 1, description: 'People can edit, delete and copy the item to their own drive.' },
        { title: 'Can download', id: 2, description: 'People can view and download the item.' },
        { title: 'Can view', id: 3, description: 'People can view the item.' },
    ];

    useEffect(() => {
        api.get(`/api/shared/file/${selectedFilesId}/share-with`)
            .then((res) => setSharedWith(res.data.data));
    }, [selectedFilesId]);

    useEffect(() => {
        if (!search) return;
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            searchUsers({ s: search }).then((res) => setPeople(res.data));
        }, 400);
        return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
    }, [search, searchUsers]);

    const filteredPeople = people.filter((p) => !users.find((u) => u.id === p.id));

    const selectUser = (person: { id: number; name: string; email: string }) => {
        if (!users.find((u) => u.id === person.id)) {
            setUsers([...users, person]);
        }
        setSearch('');
        setPeople([]);
    };

    const removeUser = (user: { id: number }) => {
        setUsers(users.filter((u) => u.id !== user.id));
    };

    const close = () => setShareFileModal(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userIds = users.map((u) => u.id);
        api.post('/api/shares/add-users', {
            userIds,
            fileids: selectedFilesId,
            permissions: permission,
        }).then(() => close());
    };

    return (
        <AppModal open={open} onClose={close} title="Share File" maxWidth="lg">
            <form className="file-deselet" onSubmit={onSubmit}>
                <div className="space-y-4 p-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <div className="min-h-[48px] rounded-lg border border-gray-300 p-2 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                                <div className="mb-1 flex flex-wrap gap-1">
                                    {users.map((user) => (
                                        <span key={user.id} className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-800">
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                                                {user.name?.slice(0, 1).toUpperCase()}
                                            </span>
                                            {user.name}
                                            <button type="button" className="ml-1 text-brand-600 hover:text-brand-800" onClick={() => removeUser(user)}>
                                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    className="w-full border-0 p-0 text-sm focus:outline-none focus:ring-0"
                                    placeholder="Search User to Share"
                                />
                            </div>
                            {filteredPeople.length > 0 && search && (
                                <div className="relative">
                                    <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {filteredPeople.map((person) => (
                                            <li key={person.id} className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100" onClick={() => selectUser(person)}>
                                                {person.name} ({person.email})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                type="button"
                                className="flex h-12 items-center gap-1 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowPermMenu(!showPermMenu)}
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showPermMenu && (
                                <ul className="absolute right-0 z-20 mt-1 w-64 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                    {permissions.map((item) => (
                                        <li key={item.id} className="cursor-pointer px-4 py-2 hover:bg-gray-50" onClick={() => { setPermission(item.id); setShowPermMenu(false); }}>
                                            <div className="flex items-center gap-2">
                                                {permission === item.id ? (
                                                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ) : (
                                                    <div className="h-5 w-5" />
                                                )}
                                                <div>
                                                    <div className="text-sm font-medium">{item.title}</div>
                                                    <div className="text-xs text-gray-500">{item.description}</div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                        Add
                    </button>

                    {selectedMedia.id && (
                        <div className="border-t pt-4">
                            <h4 className="mb-2 text-sm font-medium text-gray-600">Owner of File</h4>
                            <div className="flex items-center gap-3">
                                <img src={selectedMedia.uploader?.avatar?.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
                                <div>
                                    <div className="text-sm font-medium">{selectedMedia.uploader?.display_name}</div>
                                    <div className="text-xs text-gray-500">{selectedMedia.uploader?.email}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {sharedWith.length > 0 && (
                        <div className="border-t pt-4">
                            <h4 className="mb-2 text-sm font-medium text-gray-600">Shared with</h4>
                            {sharedWith.map((u) => (
                                <div key={u.id} className="mb-2 flex items-center gap-3">
                                    <img src={u.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
                                    <div>
                                        <div className="text-sm font-medium">{u.display_name}</div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        </AppModal>
    );
}
