declare global {
    interface Window {
        LD: {
            csftToken: string;
            user: {
                id: number;
                name?: string;
                firstname?: string;
                lastname?: string;
                email?: string;
                permissions?: string[];
                avatar?: { avatar?: string };
            };
            getUserPermissions: () => string[] | null;
            hasPermission: (p: string) => boolean;
        };
    }
}

export interface MediaFile {
    id: number;
    name: string;
    hash: string;
    extension: string;
    type: string;
    mime: string;
    public_path: string;
    url: string;
    file_size: string;
    file_name: string;
    stared: boolean;
    parent_id: number;
    deleted_at: string | null;
    description?: string;
    created_at?: { date: string };
    updated_at?: { date: string };
    edit?: boolean;
    uploader?: {
        display_name: string;
        email: string;
        avatar?: { avatar: string };
    };
}

export interface Folder {
    id: number;
    name: string;
    hash: string;
    parent_id: number;
    stared: boolean;
    children?: Folder[];
}

export interface Pagination {
    total?: number;
    total_pages?: number;
    current_page?: number;
    per_page?: number;
}

export interface User {
    id: number;
    name: string;
    firstname?: string;
    lastname?: string;
    email: string;
    display_name?: string;
    avatar?: string;
    role?: string;
    status?: string;
    permissions?: string[];
}

export interface Role {
    id: number;
    name: string;
    description?: string;
    permissions?: string[];
}

export interface Snackbar {
    show: boolean;
    message: string;
    color: 'success' | 'error' | 'info';
}
