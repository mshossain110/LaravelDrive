@extends('admin.layouts.app')


@section('title', 'Form General')

@section('headerScript')

@endsection


@section('pageContent')

<div class="col-md-12 col-sm-12 col-xs-12">
	<a href="{{route('media.create')}}" class="btn btn-primary"> Add Media</a>
</div>
<div class="col-md-12 col-sm-12 col-xs-12">

<div class="x_panel">
  <div class="x_title">
    <h2>Media Gallery <small> gallery design </small></h2>
    <div class="clearfix"></div>
  </div>
  <div class="x_content">



  	<div class="row">
	
		@foreach ($images as $image)

		<div class="col-sm-4 col-md-3">
	        <div class="thumbnail">
	          <div class="image view view-first">
	            <img style="width: 100%; display: block;" src="{{asset('storage/upload/'.$image->path)}}" alt="image" />
	            <div class="mask">
	              
	              <div class="tools tools-bottom">
	                <a href="{{asset('storage/upload/'.$image->path)}}"><i class="fa fa-link"></i></a>
	                <a href="{{route('media.edit', ['id' => $image->id])}}"><i class="fa fa-pencil"></i></a>
	                
	              </div>
	            </div>
	          </div>
	          
	          <div class="caption">
	          	<strong>{{$image->title}}</strong>
	            <p>{{$image->caption}}</p>
	          </div>
	         
	        </div>
	     </div>
		@endforeach

	</div>	
  </div>
</div>
</div>


@endsection



@section('footerScript')




@endsection