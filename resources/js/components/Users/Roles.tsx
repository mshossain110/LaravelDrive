import { useEffect, useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import AppModal from '@/components/UI/AppModal';
import type { Role } from '@/types';

export default function Roles() {
    const { roles, permissions, fetchRoles, fetchPermissions, addRole, updateRole, deleteRole } = useUsersStore();
    const [showForm, setShowForm] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, [fetchRoles, fetchPermissions]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            deleteRole(id);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage roles and permissions</p>
                </div>
                <button
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                    onClick={() => { setEditingRole(null); setShowForm(true); }}
                >
                    Add Role
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <div key={role.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">{role.name}</h3>
                        <p className="mt-1 text-xs text-gray-500">{role.description || 'No description'}</p>
                        <div className="mt-4 flex gap-2">
                            <button className="text-sm text-brand-600 hover:text-brand-900" onClick={() => { setEditingRole(role); setShowForm(true); }}>Edit</button>
                            <button className="text-sm text-red-600 hover:text-red-900" onClick={() => handleDelete(role.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <RoleFormModal
                    role={editingRole}
                    permissions={permissions}
                    onClose={() => setShowForm(false)}
                    onSave={async (data) => {
                        if (editingRole) {
                            await updateRole({ ...data, id: editingRole.id });
                        } else {
                            await addRole(data);
                        }
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
}

function RoleFormModal({ role, permissions, onClose, onSave }: {
    role: Role | null;
    permissions: string[];
    onClose: () => void;
    onSave: (data: Record<string, unknown>) => Promise<void>;
}) {
    const [form, setForm] = useState({
        name: role?.name || '',
        description: role?.description || '',
        permissions: role?.permissions || [] as string[],
    });

    const togglePermission = (perm: string) => {
        setForm((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(perm)
                ? prev.permissions.filter((p) => p !== perm)
                : [...prev.permissions, perm],
        }));
    };

    return (
        <AppModal open={true} onClose={onClose} title={role ? 'Edit Role' : 'Create Role'} maxWidth="md">
            <form onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
                <div className="space-y-4 px-6 py-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role Name</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" rows={2} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                        <div className="max-h-48 overflow-y-auto space-y-1">
                            {permissions.map((perm) => (
                                <label key={perm} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.permissions.includes(perm)}
                                        onChange={() => togglePermission(perm)}
                                        className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                    />
                                    {perm}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-3">
                    <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={onClose}>Cancel</button>
                    <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
                        {role ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </AppModal>
    );
}
