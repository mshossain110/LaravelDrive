<?php 

namespace App\Response;

use Storage;
use Response;
use App\File;

class DownloadResponse {
   
        /**
     * Return download or preview response for given file.
     *
     * @param File  $upload
     *
     * @return mixed
     */
    public function singleDownload(File $upload)
    {
        if ( ! Storage::drive('uploads_local')->exists($upload->getStoragePath())) abort(404);
        return $this->fileDownload($upload);
    }

    /**
     * Extract file type from model.
     *
     * @param File $fileModel
     * @return array
     */
    private function getTypeFromModel(File $fileModel)
    {
        $mime = $fileModel->mime;
        $type = explode('/', $mime)[0];

        return array($mime, $type);
    }

    /**
     * Should file with given mime be streamed.
     *
     * @param string $mime
     * @param string $type
     *
     * @return bool
     */
    private function shouldStream($mime, $type) {
        return $type === 'video' || $type === 'audio' || $mime === 'application/ogg';
    }

    private function fileDownload(File $upload) {
        
        list($mime, $type) = $this->getTypeFromModel($upload);

        $headers = [
            'Content-Type'=> $mime
        ];
        $filename = str_slug( str_before( $upload->name, '.' ), '-' );
        $filename = "$filename.$upload->extension";

        return Storage::drive('uploads_local')->download($upload->getStoragePath(), $filename, $headers);
        // return Response::download(Storage::drive('uploads_local')->get($upload->getStoragePath()),  'filename.' .$upload->extension , $headers);
    }
}