@extends('admin.layouts.app')


@section('title', 'Add new article')

@section('headerScript')

@endsection


@section('pageContent')

<div class="col-md-12 col-sm-12 col-xs-12">
<div class="x_panel">
                <div class="x_title">
                  <h2>Create A New Article</h2>
                  
                  <div class="clearfix"></div>
                </div>
                <div class="x_content">

                {!! Form::open(array('route' => 'article.store', 'method' => 'POST', 'role' => 'form')) !!}

                 {{-- -or- {!! Form::open(array('method' => 'POST', 'method' => 'POST', 'role' => 'form')) !!} --}}


                 <div class="form-group has-feedback row">
                    {!! Form::label('post_title', Lang::get('forms.create_article_label_title'), array('class' => 'col-md-12 control-label')); !!}
                    <div class="col-md-12">
                          {!! Form::text('post_title', NULL, array('id' => 'post_title', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_article_ph_title'))) !!}
                          

                        @if ($errors->has('post_title'))
                                      <span class="help-block">
                                          <strong>{{ $errors->first('post_title') }}</strong>
                                      </span>
                                  @endif
                    </div>
                  </div>

                  <div class="form-group form-group-sm has-feedback row">
                    {!! Form::label('post_slog', URL::to('admin').'/', array('class' => 'col-md-3 control-label')); !!}
                    <div class="col-md-9">
                        <div class="input-group">
                          {!! Form::text('post_slog', NULL, array('id' => 'post_slog', 'class' => 'form-control input-sm', 'placeholder' => Lang::get('forms.create_article_ph_slog'))) !!}
                          
                        </div>
                        @if ($errors->has('post_title'))
                              <span class="help-block">
                                  <strong>{{ $errors->first('post_title') }}</strong>
                              </span>
                        @endif
                    </div>
                  </div>

                  <div class="form-group has-feedback row">
                    <div class="col-md-12">
                        

                          

                          <textarea name="post_content" id="editor" class="editor-wrapper" ></textarea>

                    </div>
                  </div>
    
                  
                {!! Form::button('<i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;' . Lang::get('forms.create_article_button_text'), array('class' => 'btn btn-primary btn-flat btn-lg margin-bottom-1','type' => 'submit')) !!}

                {!! Form::close() !!}
                  
                </div> 
              </div>
</div>


@endsection



@section('footerScript')


<!-- bootstrap-wysiwyg -->
    <script src="/bower/tinymce/tinymce.min.js"  type="text/javascript"></script>
    <!-- bootstrap-wysiwyg -->
    <script type="text/javascript">
      tinymce.init({
          selector: 'textarea',
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
          ],
          toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
          content_css: '//www.tinymce.com/css/codepen.min.css'
        });
    </script>
    <!-- /bootstrap-wysiwyg -->



   

    






@endsection