import { useState, useCallback, useRef } from 'react';
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

export default function FileUploader({ active, onDeactivate, currentFolderId }: FileUploaderProps) {
    const [filesAdded, setFilesAdded] = useState(false);
    const [expandLess, setExpandLess] = useState(true);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const setMediaItem = useMediaStore((s) => s.setMediaItems);
    const mediaItems = useMediaStore((s) => s.mediaItems);

    const uploadFile = useCallback(async (file: File) => {
        const chunkSize = 1000000; // 1MB
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('file', chunk, file.name);
            formData.append('path', '/' + file.name);
            formData.append('parent_id', String(currentFolderId));
            formData.append('is_last', i === totalChunks - 1 ? '1' : '0');
            formData.append('chunk_index', String(i));
            formData.append('total_chunks', String(totalChunks));

            try {
                const res = await api.post('/api/file', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const chunkProgress = progressEvent.loaded / (progressEvent.total || 1);
                        const totalProgress = ((i + chunkProgress) / totalChunks) * 100;
                        setFileList((prev) =>
                            prev.map((f) =>
                                f.name === file.name ? { ...f, progress: totalProgress } : f
                            )
                        );
                    },
                });

                if (i === totalChunks - 1 && res.data?.data) {
                    setMediaItem([res.data.data, ...mediaItems]);
                }
            } catch {
                setFileList((prev) =>
                    prev.map((f) =>
                        f.name === file.name ? { ...f, progress: -1 } : f
                    )
                );
                break;
            }
        }
    }, [currentFolderId, setMediaItem, mediaItems]);

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

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        noClick: !active,
        noKeyboard: true,
    });

    // Expose open method via ref for toolbar
    const openRef = useRef(open);
    openRef.current = open;

    return (
        <>
            {/* Dropzone overlay */}
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
}
