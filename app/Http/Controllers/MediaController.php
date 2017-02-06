<?php

namespace App\Http\Controllers;

use App\Media;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images = Media::all();

        return view('admin.media.index')->with(compact('images'));
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
        $fileName = explode(".", $request->input('qqfilename'));
        $ext= $file->extension();
        $date = Carbon::now();
        $image = new Media;
        $image->path = $date->year.'/'.$date->month.'/'.$fileName[0].'.'.$ext;
        $image->title =$fileName[0];
        $image->caption = $request->caption;
        $image->alternative_text = $request->alternative_text;

        
        if($image->save()){
            $file->storeAs('upload/'.$date->year.'/'.$date->month, $fileName[0].'.'.$ext, 'public');

            return  response()->json([
                            "success"=> true,
                            "uuid" =>$request->qquuid
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
