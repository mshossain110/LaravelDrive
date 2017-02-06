@extends('admin.layouts.app')


@section('title', 'Form General')

@section('headerScript')

@endsection


@section('pageContent')

<div class="col-md-12 col-sm-12 col-xs-12">

<div class="x_panel">
  <div class="x_title">
    <h2>Edit Image</h2>
    <div class="clearfix"></div>
  </div>
  <div class="x_content">
  			{{ Form::model($media, array('route' => array('media.update', $media->id), 'method' => 'put', 'role' => 'form')) }}
    		
                      <div class="form-group has-feedback row">
						{!! Form::label('title', Lang::get('forms.media_edit_title'), array('class' => 'col-md-3 control-label')); !!}
						<div class="col-md-9">
						  	<div class="input-group">
						    	{!! Form::text('title', NULL, array('id' => 'title', 'class' => 'form-control') ) !!}
						    	
						  	</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-9">
						  	<img src="{{asset('storage/upload/'.$media->path)}}" class="img-responsive">
						  	</br>
						  	</br>
						</div>
					</div>
                      <div class="form-group has-feedback row">
						{!! Form::label('alternetive_text', Lang::get('forms.media_edit_alternetive_text'), array('class' => 'col-md-3 control-label')); !!}
						<div class="col-md-9">
						  	<div class="input-group">
						    	{!! Form::text('alternetive_text', NULL, array('id' => 'title', 'class' => 'form-control')) !!}
						    	
						  	</div>
						  	
						</div>
					</div>

                      <div class="form-group has-feedback row">
						{!! Form::label('caption', Lang::get('forms.media_edit_caption'), array('class' => 'col-md-3 control-label')); !!}
						<div class="col-md-9">
						  	<div class="input-group">
						    	{!! Form::textarea('caption', NULL, array('id' => 'title', 'class' => 'form-control')) !!}
						    	
						  	</div>
						  	
						</div>
					</div>

					{!! Form::button(Lang::get('forms.media_edit_button'), array('class' => 'btn btn-primary btn-flat btn-lg margin-bottom-1','type' => 'submit')) !!}
                      

                   {{ Form::close() }}
                   {!! Form::open([
            'method' => 'DELETE',
            'route' => ['media.destroy', $media->id]
        ]) !!}
            {!! Form::submit('Delete Parmanently', ['class' => 'btn btn-danger btn-flat btn-lg margin-bottom-1']) !!}
        {!! Form::close() !!}
  </div>
</div>
</div>


@endsection



@section('footerScript')




@endsection