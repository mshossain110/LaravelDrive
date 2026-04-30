import { useState, useEffect, useRef } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import { useAppStore } from '@/stores/appStore';
import AppModal from '@/components/UI/AppModal';
import api from '@/lib/axios';

interface ShareLinkProps {
    open: boolean;
}

export default function ShareLink({ open }: ShareLinkProps) {
    const selectedFilesId = useMediaStore((s) => s.selectedFilesId);
    const setShareLinkModal = useMediaStore((s) => s.setShareLinkModal);
    const setSnackbar = useAppStore((s) => s.setSnackbar);

    const [loading, setLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [linkExpire, setLinkExpire] = useState(false);
    const [linkExpireDate, setLinkExpireDate] = useState('');
    const [linkExpireTime, setLinkExpireTime] = useState('');
    const [password, setPassword] = useState(false);
    const [linkPassword, setLinkPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [editable, setEditable] = useState(false);
    const [downloadable, setDownloadable] = useState(true);
    const [linkData, setLinkData] = useState<{ id?: number; link?: string }>({});
    const linkRef = useRef<HTMLInputElement>(null);

    const hasLinkData = linkData.id !== undefined;

    useEffect(() => {
        if (!selectedFilesId.length) return;
        api.get(`/api/shareable-links/file/${selectedFilesId[0]}`)
            .then((res) => {
                setLinkData(res.data.data);
                setTimeout(() => linkRef.current?.focus(), 100);
            });
    }, [selectedFilesId]);

    const close = () => setShareLinkModal(false);

    const storeShareableLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        api.post(`/api/shareable-links/file/${selectedFilesId[0]}`, {
            file_id: selectedFilesId[0],
            allow_edit: editable,
            allow_download: downloadable,
            password: linkPassword,
            expires_at: linkExpireDate + ' ' + linkExpireTime,
        }).then((res) => {
            setLinkData(res.data.data);
            setLoading(false);
        });
    };

    const deleteShareableLink = () => {
        if (!hasLinkData) return;
        api.delete(`/api/shareable-links/${linkData.id}`).then(() => close());
    };

    const copyLink = () => {
        if (linkRef.current) {
            linkRef.current.select();
            navigator.clipboard.writeText(linkData.link || '');
            setSnackbar({ message: 'Link Copied successfully', color: 'success', show: true });
        }
    };

    return (
        <AppModal open={open} onClose={close} title="Shareable link" maxWidth="sm">
            <form className="file-deselet" onSubmit={storeShareableLink}>
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between">
                        <strong className="text-sm">Link sharing is on</strong>
                        <div className="flex gap-1">
                            {hasLinkData && (
                                <button type="button" className="rounded-full border border-red-300 p-1.5 text-red-500 hover:bg-red-50" onClick={deleteShareableLink}>
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                            <button type="button" className="rounded-full border border-gray-300 p-1.5 text-gray-500 hover:bg-gray-50" onClick={() => setShowSettings(!showSettings)}>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            ref={linkRef}
                            type="text"
                            value={linkData.link || ''}
                            readOnly
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            onFocus={(e) => e.target.select()}
                        />
                        <button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700" onClick={copyLink}>
                            Copy
                        </button>
                    </div>

                    {showSettings && (
                        <div className="space-y-4 rounded-lg border border-gray-200 p-4">
                            <div className="border-b border-gray-200 pb-4">
                                <p className="mb-2 text-sm font-medium">Link expiration</p>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={linkExpire} onChange={(e) => setLinkExpire(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                    Link is valid until:
                                </label>
                                {linkExpire && (
                                    <div className="mt-2 flex gap-2">
                                        <input type="date" value={linkExpireDate} onChange={(e) => setLinkExpireDate(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                                        <input type="time" value={linkExpireTime} onChange={(e) => setLinkExpireTime(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                                    </div>
                                )}
                            </div>

                            <div className="border-b border-gray-200 pb-4">
                                <p className="mb-2 text-sm font-medium">Password Protect</p>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={password} onChange={(e) => setPassword(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                    Require password:
                                </label>
                                {password && (
                                    <div className="relative mt-2">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={linkPassword}
                                            onChange={(e) => setLinkPassword(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm"
                                            placeholder="At least 8 characters"
                                        />
                                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="border-b border-gray-200 pb-4">
                                <p className="mb-2 text-sm font-medium">Allow editing</p>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={editable} onChange={(e) => setEditable(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                    Users with link can modify this item.
                                </label>
                            </div>

                            <div>
                                <p className="mb-2 text-sm font-medium">Allow download</p>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={downloadable} onChange={(e) => setDownloadable(e.target.checked)} className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                    Users with link can download this item.
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 border-t px-4 py-3">
                    <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        {hasLinkData ? 'Update Link' : 'Create Link'}
                    </button>
                    <button type="button" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700" onClick={close}>
                        Cancel
                    </button>
                </div>
            </form>
        </AppModal>
    );
}
