import { useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaStore } from '@/stores/mediaStore';
import { ChevronUpIcon, ChevronDownIcon, XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline';
import api from '@/lib/axios';

interface UploadFile {
    file: File;
    progress: number;
    name: string;
}

interface FileUploaderProps {
    active: boolean;
    onDeactivate: () => void;
    currentFolderId: number;
}

export interface FileUploaderHandle {
    openFilePicker: () => void;
    openFolderPicker: () => void;
}

const FileUploader = forwardRef<FileUploaderHandle, FileUploaderProps>(function FileUploader({ active, onDeactivate, currentFolderId }, ref) {
    const [filesAdded, setFilesAdded] = useState(false);
    const [expandLess, setExpandLess] = useState(true);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const setMediaItem = useMediaStore((s) => s.setMediaItems);

    const uploadFile = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('path', '/' + file.name);
        formData.append('parent_id', String(currentFolderId));

        try {
            const res = await api.post('/api/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 100;
                    setFileList((prev) =>
                        prev.map((f) =>
                            f.name === file.name ? { ...f, progress } : f
                        )
                    );
                },
            });

            if (res.data?.data) {
                const current = useMediaStore.getState().mediaItems;
                setMediaItem([res.data.data, ...current]);
            }
        } catch {
            setFileList((prev) =>
                prev.map((f) =>
                    f.name === file.name ? { ...f, progress: -1 } : f
                )
            );
        }
    }, [currentFolderId, setMediaItem]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFilesAdded(true);
            onDeactivate();
            const newFiles = acceptedFiles.map((f) => ({ file: f, progress: 0, name: f.name }));
            setFileList((prev) => [...prev, ...newFiles]);
            acceptedFiles.forEach(uploadFile);
        },
        [uploadFile, onDeactivate]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        noClick: !active,
        noKeyboard: true,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        openFilePicker: () => fileInputRef.current?.click(),
        openFolderPicker: () => folderInputRef.current?.click(),
    }));

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onDrop(Array.from(files));
        }
        e.target.value = '';
    };

    return (
        <>
            {/* Hidden file inputs for native browser picker */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileInputChange}
            />
            <input
                type="file"
                ref={folderInputRef}
                className="hidden"
                // @ts-expect-error webkitdirectory is not in React's type definitions
                webkitdirectory=""
                onChange={handleFileInputChange}
            />

            {/* Dropzone overlay – only for drag-and-drop */}
            {active && (
                <div
                    {...getRootProps()}
                    className="fixed inset-0 z-40 flex items-center justify-center bg-brand-600/20 backdrop-blur-sm"
                    onClick={(e) => { e.stopPropagation(); onDeactivate(); }}
                >
                    <input {...getInputProps()} />
                    <div className="rounded-2xl border-4 border-dashed border-brand-400 bg-white/90 p-16 text-center">
                        <p className="text-lg font-medium text-brand-700">Drop files here to upload</p>
                        <p className="mt-1 text-sm text-gray-500">or click to select files</p>
                    </div>
                </div>
            )}

            {/* Upload progress panel */}
            {filesAdded && (
                <div className="fixed bottom-5 right-5 z-50 w-[420px] overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200">
                    <div className="flex items-center gap-2 bg-brand-600 px-4 py-2.5">
                        <span className="flex-1 text-sm font-medium text-white">Uploading files</span>
                        <button className="rounded p-1 text-white/80 hover:text-white" onClick={() => setExpandLess(!expandLess)}>
                            {expandLess ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                        </button>
                        <button className="rounded p-1 text-white/80 hover:text-white" onClick={() => setFilesAdded(false)}>
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                    {expandLess && (
                        <div className="max-h-60 divide-y divide-gray-100 overflow-y-auto">
                            {fileList.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-3 px-4 py-2.5">
                                    <DocumentIcon className="h-5 w-5 shrink-0 text-gray-400" />
                                    <span className="flex-1 truncate text-sm text-gray-700">{file.name}</span>
                                    {file.progress === -1 ? (
                                        <span className="shrink-0 text-xs font-medium text-red-500">Failed</span>
                                    ) : file.progress >= 100 ? (
                                        <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" className="text-gray-200" />
                                            <circle
                                                cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none"
                                                className="text-brand-600"
                                                strokeDasharray={62.83}
                                                strokeDashoffset={62.83 - (62.83 * file.progress) / 100}
                                                strokeLinecap="round"
                                                transform="rotate(-90 12 12)"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
});

export default FileUploader;
