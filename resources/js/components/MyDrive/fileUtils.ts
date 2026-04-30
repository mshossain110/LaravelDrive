import type { ComponentType } from 'react';
import {
    PhotoIcon,
    DocumentTextIcon,
    FilmIcon,
    MusicalNoteIcon,
    FolderIcon,
    DocumentIcon,
    ArchiveBoxIcon,
    CodeBracketIcon,
} from '@heroicons/react/24/outline';

const imageTypes = ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'bmp', 'dib'];
const videoTypes = ['mp4', 'webm', '3gp', 'flv', 'ogg', 'ogv', 'mov', 'wmv', 'mpeg'];
const audioTypes = ['mp3', 'ogg'];
const archiveTypes = ['zip', 'rar', '7z', 'tar', 'gz'];
const codeTypes = ['css', 'html', 'javascript', 'js', 'ts', 'xml', 'json'];

export function isImageType(ext: string) {
    return imageTypes.includes(ext);
}

export function isVideoType(ext: string) {
    return videoTypes.includes(ext);
}

export function isAudioType(ext: string) {
    return audioTypes.includes(ext);
}

export function isPdfType(ext: string) {
    return ['pdf', 'txt'].includes(ext);
}

export function getFileIcon(ext: string, type: string): ComponentType<{ className?: string }> {
    if (type === 'folder') return FolderIcon;
    if (imageTypes.includes(ext)) return PhotoIcon;
    if (['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'csv'].includes(ext)) return DocumentTextIcon;
    if (videoTypes.includes(ext)) return FilmIcon;
    if (audioTypes.includes(ext)) return MusicalNoteIcon;
    if (archiveTypes.includes(ext)) return ArchiveBoxIcon;
    if (codeTypes.includes(ext)) return CodeBracketIcon;
    return DocumentIcon;
}

export function getFileIconColor(ext: string, type: string): string {
    if (type === 'folder') return 'text-amber-500';
    if (imageTypes.includes(ext)) return 'text-emerald-500';
    if (['pdf'].includes(ext)) return 'text-red-500';
    if (['doc', 'docx'].includes(ext)) return 'text-blue-600';
    if (['xls', 'xlsx', 'csv'].includes(ext)) return 'text-green-600';
    if (videoTypes.includes(ext)) return 'text-purple-500';
    if (audioTypes.includes(ext)) return 'text-orange-500';
    return 'text-gray-400';
}
