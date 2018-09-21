<?php 

namespace App\Response;

use Storage;
use App\File;
use Symfony\Component\HttpFoundation\Response;

class ImageResponse {

    /**
     * Create response for previewing specified image.
     * Optionally resize image to specified size.
     *
     * @param File $entry
     * @return Response
     */
    public function create(File $entry)
    {
        $content = Storage::drive('uploads_local')->get($entry->getStoragePath());
        return response($content, 200, ['Content-Type' => $entry->mime]);
    }
}