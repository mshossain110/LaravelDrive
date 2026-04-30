<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends ApiController
{
    /**
     * Get all notifications for the authenticated user.
     */
    public function index()
    {
        $notifications = Auth::user()->notifications()->paginate(20);

        return $this->respondWithArray([
            'data' => $notifications->map(fn ($notification) => [
                'id' => $notification->id,
                'type' => class_basename($notification->type),
                'data' => $notification->data,
                'read_at' => $notification->read_at,
                'created_at' => $notification->created_at->diffForHumans(),
            ]),
            'unread_count' => Auth::user()->unreadNotifications()->count(),
            'next_page_url' => $notifications->nextPageUrl(),
        ]);
    }

    /**
     * Get unread notification count.
     */
    public function unreadCount()
    {
        return $this->respondWithArray([
            'unread_count' => Auth::user()->unreadNotifications()->count(),
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function markAsRead(string $id)
    {
        $notification = Auth::user()->notifications()->where('id', $id)->first();

        if (!$notification) {
            return $this->setStatusCode(404)->respondWithArray(['message' => 'Notification not found.']);
        }

        $notification->markAsRead();

        return $this->respondWithArray([
            'message' => 'Notification marked as read.',
            'unread_count' => Auth::user()->unreadNotifications()->count(),
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return $this->respondWithArray([
            'message' => 'All notifications marked as read.',
            'unread_count' => 0,
        ]);
    }
}
