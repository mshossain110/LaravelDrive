<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Article;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::all();

        return view('admin.article.index')->with(compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       return view('admin.article.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::info($request->all());
        // validate user from validation function
        $validator = $this->validator($request->all());
        
        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        $article = new Article;

        $article->post_title        = $request->input('post_title');
        $article->post_slog         = $request->input('post_slog');
        $article->post_content      = $request->input('post_content');
        $article->post_excerpt      = $request->input('post_content');
        $article->post_thumbnail      = "comming soon";
        $article->published_at      = Carbon::now();;
        $article->user_id           = Auth::id();

        $article->save();

        return redirect('/admin/article');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'post_title' => 'required|max:255',
            'post_slog' => 'required|max:255|unique:articles'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
