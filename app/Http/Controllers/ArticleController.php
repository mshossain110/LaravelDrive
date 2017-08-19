<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ArticleRequests;
use App\Article;
use Carbon\Carbon;
use Validator;
use Log;

use App\Repositories\ArticleRepository;


class ArticleController extends Controller
{

    protected $article;


    public function __construct(ArticleRepository $article){
        $this->article = $article;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = $this->article->all();

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
     * @param  \Illuminate\Http\Requests\ArticleRequests  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleRequests $request)
    {
        $data = array_merge($request->all(), [
                'user_id' => Auth::id(),
                'published_at' =>Carbon::now(),
            ]);

        $this->article->store($data);

        return redirect('/admin/article');
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
        
        $this->article->destroy($id);
    }
}
