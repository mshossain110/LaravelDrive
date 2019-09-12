<?php

namespace App\Http\Controllers\API\V1;

use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use App\Http\Controllers\Controller;
use League\Fractal\Resource\Collection;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ApiController extends Controller
{
    /**
     * @var int $statusCode
     */
    protected $statusCode = 200;

    const CODE_WRONG_ARGS = 'GEN-FUBARGS';
    const CODE_NOT_FOUND = 'GEN-LIKETHEWIND';
    const CODE_INTERNAL_ERROR = 'GEN-AAAGGH';
    const CODE_UNAUTHORIZED = 'GEN-MAYBGTFO';
    const CODE_FORBIDDEN = 'GEN-GTFO';
    const CODE_INVALID_MIME_TYPE = 'GEN-UMWUT';

    /**
     * @var Manager $fractal
     */
    protected $fractal;

    public function __construct()
    {
        $this->fractal = new Manager;

        if (isset($_GET['include'])) {
            $this->fractal->parseIncludes($_GET['include']);
        }
    }

    /**
     * Get the status code.
     *
     * @return int $statusCode
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Set the status code.
     *
     * @param $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Repond a no content response.
     * 
     * @return response
     */
    public function noContent()
    {
        return response()->json(null, 204);
    }

    /**
     * Respond the item data.
     *
     * @param $item
     * @param $callback
     * @return mixed
     */
    public function respondWithItem($item, $callback, $message = 'Successfully')
    {
        $resource = new Item($item, $callback);

        $data = $this->fractal->createData($resource)->toArray();

        $data['message'] = $message;

        return $this->respondWithArray($data);
    }

    /**
     * Respond the collection data.
     *
     * @param $collection
     * @param $callback
     * @return mixed
     */
    public function respondWithCollection($collection, $callback, $message = 'Successfully')
    {
        $resource = new Collection($collection, $callback);

        $data = $this->fractal->createData($resource)->toArray();
        $data['message'] = $message;

        return $this->respondWithArray($data);
    }

    /**
     *  Respond the collection data with pagination.
     *
     * @param $paginator
     * @param $callback
     * @return mixed
     */
    public function respondWithPaginator($paginator, $callback, $message = 'Successfully')
    {
        $resource = new Collection($paginator->getCollection(), $callback);

        $resource->setPaginator(new IlluminatePaginatorAdapter($paginator));

        $data = $this->fractal->createData($resource)->toArray();
        $data['message'] = $message;

        return $this->respondWithArray($data);
    }

    /**
     * Respond the data.
     *
     * @param array $array
     * @param array $headers
     * @return mixed
     */
    public function respondWithArray(array $array, array $headers = [])
    {
        return response()->json($array, $this->statusCode, $headers);
    }

    /**
     * Respond the message.
     * 
     * @param  string $message
     * @return json
     */

    public function respondWithMessage ($message) {
        return $this->setStatusCode(200)
            ->respondWithArray([
                    'message' => $message,
                ]);
    }

    /**
     * Respond the error message.
     * 
     * @param  string $message
     * @param  string $errorCode
     * @return json
     */
    protected function respondWithError($message, $errorCode, $errors = [])
    {
        if ($this->statusCode === 200) {
            trigger_error(
                "You better have a really good reason for erroring on a 200...",
                E_USER_WARNING
            );
        }

        return $this->respondWithArray([
            'errors'  => $errors,
            'code'    => $errorCode,
            'message' => $message,
        ]);
    }

    /**
     * Respond the error of 'Forbidden'
     * 
     * @param  string $message
     * @return json
     */
    public function errorForbidden($message = 'Forbidden', $errors = [])
    {
        return $this->setStatusCode(500)
                    ->respondWithError($message, self::CODE_FORBIDDEN, $errors);
    }

    /**
     * Respond the error of 'Internal Error'.
     * 
     * @param  string $message
     * @return json
     */
    public function errorInternalError($message = 'Internal Error', $errors = [])
    {
        return $this->setStatusCode(500)
                    ->respondWithError($message, self::CODE_INTERNAL_ERROR, $errors);
    }

    /**
     * Respond the error of 'Resource Not Found'
     * 
     * @param  string $message
     * @return json
     */
    public function errorNotFound($message = 'Resource Not Found', $errors = [])
    {
        return $this->setStatusCode(404)
                    ->respondWithError($message, self::CODE_NOT_FOUND, $errors);
    }

    /**
     * Respond the error of 'Unauthorized'.
     * 
     * @param  string $message
     * @return json
     */
    public function errorUnauthorized($message = 'Unauthorized', $errors = [])
    {
        return $this->setStatusCode(401)
                    ->respondWithError($message, self::CODE_UNAUTHORIZED, $errors);
    }

    /**
     * Respond the error of 'Wrong Arguments'.
     * 
     * @param  string $message
     * @return json
     */
    public function errorWrongArgs($message = 'Wrong Arguments', $errors = [])
    {
        return $this->setStatusCode(400)
                    ->respondWithError($message, self::CODE_WRONG_ARGS, $errors);
    }
}
