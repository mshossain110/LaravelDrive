@extends('admin.layouts.app')


@section('title', 'Form General')

@section('headerScript')


    
<link href="/bower/fine-uploader/dist/fine-uploader.min.css" type="text/css" rel="stylesheet">
<link href="/bower/fine-uploader/dist/fine-uploader-new.css" type="text/css" rel="stylesheet">




    <style>
        #trigger-upload {
            color: white;
            background-color: #00ABC7;
            font-size: 14px;
            padding: 7px 20px;
            background-image: none;
        }

        #fine-uploader-manual-trigger .qq-upload-button {
            margin-right: 15px;
        }

        #fine-uploader-manual-trigger .buttons {
            width: 36%;
        }

        #fine-uploader-manual-trigger .qq-uploader .qq-total-progress-bar-container {
            width: 60%;
        }
    </style>

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
	            <img style="width: 100%; display: block;" src="{{$image->getPath()}}" alt="image" />
	            <div class="mask">
	              
	              <div class="tools tools-bottom">
	                <a href="{{$image->getPath()}}"><i class="fa fa-link"></i></a>
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