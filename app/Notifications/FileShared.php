<?php

namespace App\Notifications;

use App\Models\File;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class FileShared extends Notification
{
    use Queueable;

    protected User $sharedBy;
    protected array $fileIds;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $sharedBy, array $fileIds)
    {
        $this->sharedBy = $sharedBy;
        $this->fileIds = $fileIds;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        $files = File::whereIn('id', $this->fileIds)->get(['id', 'name', 'type']);

        return [
            'shared_by' => [
                'id' => $this->sharedBy->id,
                'name' => $this->sharedBy->name,
            ],
            'files' => $files->map(fn ($file) => [
                'id' => $file->id,
                'name' => $file->name,
                'type' => $file->type,
            ])->toArray(),
            'message' => $this->sharedBy->name . ' shared ' . $files->count() . ' file(s) with you.',
        ];
    }
}
