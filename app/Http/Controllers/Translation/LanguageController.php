<?php

namespace App\Http\Controllers\Translation;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\JsonResource;
use JoeDixon\Translation\Drivers\Translation;
use JoeDixon\Translation\Http\Requests\LanguageRequest;

class LanguageController extends Controller
{
    private $translation;

    public function __construct(Translation $translation)
    {
        $this->translation = $translation;
    }

    public function index(Request $request)
    {
        $languages = $this->translation->allLanguages();

        return new JsonResource($languages);
    }

    public function create()
    {
        return view('translation::languages.create');
    }

    public function store(LanguageRequest $request)
    {
        $this->translation->addLanguage($request->locale, $request->name);
        return response()->json(['success' => true,]);
    }
}
