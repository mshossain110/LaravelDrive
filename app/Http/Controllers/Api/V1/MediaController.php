<?php

namespace App\Http\Controllers\Api\V1;

use App\Media;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use App\Http\Controllers\Controller;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Media::all();//response()->json(["media"=>], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.media.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = $request->file('file');
        
        $date = Carbon::now();

        $path = $date->year.'/'.$date->month.'/'.$file->getClientOriginalName();
        $image = new Media;
        $image->path = asset('storage/'.$path);

        $image->title =$file->getClientOriginalName();
        $image->caption = $request->caption;
        $image->alt_text = $request->alternative_text;

        
        if($image->save()){
            $file->storeAs($date->year.'/'.$date->month, $file->getClientOriginalName(), 'public');
            return  response()->json([
                            "success"=> true,
                        ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function show(Media $media)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $media = Media::findOrFail($id);
        return view('admin.media.edit')->with(compact('media'));;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $media = Media::findOrFail($id);

        $media->title =$request->title;
        $media->caption = $request->caption;
        $media->alternative_text = $request->alternative_text;

        $media->save();
        return redirect()->route('media.index');     
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $media = Media::findOrFail($id);
        Storage::delete(public_path().'/storage/upload/'.$media->path);
        $media->delete();
        return redirect()->route('media.index');
    }
}
