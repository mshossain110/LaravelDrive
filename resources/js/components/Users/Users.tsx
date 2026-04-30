import { useEffect, useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import { useAppStore } from '@/stores/appStore';
import AppModal from '@/components/UI/AppModal';
import type { User } from '@/types';

export default function Users() {
    const { users, pagination, fetchUsers, addUser, updateUser, deleteUser } = useUsersStore();
    const setSnackbar = useAppStore((s) => s.setSnackbar);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage users and their permissions</p>
                </div>
                {window.LD?.hasPermission('user.create') && (
                    <button
                        className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                        onClick={handleCreate}
                    >
                        Add User
                    </button>
                )}
            </div>

            {/* Search */}
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
            </div>

            {/* Users table */}
            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users
                            .filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
                            .map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                                                {(user.name || '?')[0].toUpperCase()}
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.role || '-'}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                        <button className="text-brand-600 hover:text-brand-900 mr-3" onClick={() => handleEdit(user)}>Edit</button>
                                        {window.LD?.hasPermission('user.delete') && (
                                            <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(user.id)}>Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* User Form Modal */}
            {showForm && (
                <UserFormModal
                    user={editingUser}
                    onClose={() => setShowForm(false)}
                    onSave={async (data) => {
                        if (editingUser) {
                            await updateUser({ ...data, id: editingUser.id });
                        } else {
                            await addUser(data);
                        }
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
}

function UserFormModal({ user, onClose, onSave }: { user: User | null; onClose: () => void; onSave: (data: Record<string, unknown>) => Promise<void> }) {
    const [form, setForm] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        name: user?.name || '',
        email: user?.email || '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <AppModal open={true} onClose={onClose} title={user ? 'Edit User' : 'Create User'} maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 px-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} {...(!user ? { required: true } : {})} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                    </div>
                </div>
                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                    <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={onClose}>Cancel</button>
                    <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
                        {user ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </AppModal>
    );
}
