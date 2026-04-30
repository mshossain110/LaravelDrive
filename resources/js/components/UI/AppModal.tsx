import { Fragment, type ReactNode } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AppModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    children: ReactNode;
    footer?: ReactNode;
}

const maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};

export default function AppModal({ open, onClose, title, maxWidth = 'md', children, footer }: Readonly<AppModalProps>) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel
                                className={`w-full transform rounded-2xl bg-white shadow-xl transition-all ${maxWidthClasses[maxWidth] || 'max-w-md'}`}
                            >
                                {title && (
                                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                        <DialogTitle className="text-lg font-semibold text-gray-900">
                                            {title}
                                        </DialogTitle>
                                        <button
                                            type="button"
                                            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                            onClick={onClose}
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                                {children}
                                {footer && (
                                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                                        {footer}
                                    </div>
                                )}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
