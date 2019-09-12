<?php

namespace App\Http\Controllers\API\V1;

use Auth;
use Storage;
use App\File;
use App\Transformers\FileTransformer;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Response\DownloadResponse;

class DownloadController extends ApiController
{
        /**
     * @var Request
     */
    private $request;

    /**
     * @var File
     */
    private $file;
    /**
     * download response
     * 
     * @var DownloadResponse
     */

    private $downloadResponse;

    public function __construct(Request $request, File $file, DownloadResponse $downloadResponse)
    {
        parent::__construct();
        
        $this->request = $request;
        $this->file = $file;

        $this->downloadResponse = $downloadResponse;
    } 

    public function download (Request $request) 
    {
        $ids = $request->get('ids');

        if (sizeof( $ids ) > 1) {
            return $this->downloadResponse->multipleDownload($ids);
        } else {
            return $this->downloadResponse->singleDownload($ids[0]);
        }
    }
}