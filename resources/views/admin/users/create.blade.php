@extends('admin.layouts.app')


@section('title', 'Form General')

@section('headerScript')

@endsection


@section('pageContent')

<div class="col-md-12 col-sm-12 col-xs-12">
	<div class="panel panel-default">
		<div class="panel-heading">
			Create New User
		</div>
		<div class="panel-body">

			{!! Form::open(array('url' => '/admin/user/create', 'method' => 'POST', 'role' => 'form')) !!}
				{{-- -or- {!! Form::open(array('method' => 'POST', 'method' => 'POST', 'role' => 'form')) !!} --}}


				<div class="form-group has-feedback row">
					{!! Form::label('email', Lang::get('forms.create_user_label_email'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
					  	<div class="input-group">
					    	{!! Form::text('email', NULL, array('id' => 'email', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_user_ph_email'))) !!}
					    	<label class="input-group-addon" for="email"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_email') }}" aria-hidden="true"></i></label>
					  	</div>
					  	@if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
					</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('username', Lang::get('forms.create_user_label_username'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
			      		<div class="input-group">
			        		{!! Form::text('username', NULL, array('id' => 'name', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_user_ph_username'))) !!}
			        		<label class="input-group-addon" for="name"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_username') }}" aria-hidden="true"></i></label>
			      		</div>
			      		@if ($errors->has('username'))
                            <span class="help-block">
                                <strong>{{ $errors->first('username') }}</strong>
                            </span>
                        @endif
			      	</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('firstName', Lang::get('forms.create_user_label_firstname'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
			      		<div class="input-group">
			        		{!! Form::text('firstName', NULL, array('id' => 'first_name', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_user_ph_firstname'))) !!}
			        		<label class="input-group-addon" for="firstName"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_firstname') }}" aria-hidden="true"></i></label>
			      		</div>
			      		@if ($errors->has('firstName'))
                            <span class="help-block">
                                <strong>{{ $errors->first('firstName') }}</strong>
                            </span>
                        @endif
			      	</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('lastName', Lang::get('forms.create_user_label_lastname'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
			      		<div class="input-group">
			        		{!! Form::text('lastName', NULL, array('id' => 'lastName', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_user_ph_lastname'))) !!}
			        		<label class="input-group-addon" for="lastName"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_lastname') }}" aria-hidden="true"></i></label>
			      		</div>
			      		@if ($errors->has('lastName'))
                            <span class="help-block">
                                <strong>{{ $errors->first('lastName') }}</strong>
                            </span>
                        @endif
			      	</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('permission', 'User Access Level' , array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
						<div class="input-group">
			        		{!! Form::select('permission', config('app.permission'), NULL, array('class' => 'form-control')) !!}
							<label class="input-group-addon" for="permission"><i class="fa fa-fw fa-exclamation-circle" aria-hidden="true"></i></label>
						</div>
						
					</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('password', Lang::get('forms.create_user_label_password'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
			      		<div class="input-group">
			        		{!! Form::password('password', array('id' => 'password', 'class' => 'form-control ', 'placeholder' => Lang::get('forms.create_user_ph_password'))) !!}
			        		<label class="input-group-addon" for="password"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_password') }}" aria-hidden="true"></i></label>
			      		</div>
			      		@if ($errors->has('password'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif
			      	</div>
				</div>

				<div class="form-group has-feedback row">
					{!! Form::label('password_confirmation', Lang::get('forms.create_user_label_pw_confirmation'), array('class' => 'col-md-3 control-label')); !!}
					<div class="col-md-9">
			      		<div class="input-group">
			        		{!! Form::password('password_confirmation', array('id' => 'password_confirmation', 'class' => 'form-control', 'placeholder' => Lang::get('forms.create_user_ph_pw_confirmation'))) !!}
			        		<label class="input-group-addon" for="confirmed"><i class="fa fa-fw {{ Lang::get('forms.create_user_icon_pw_confirmation') }}" aria-hidden="true"></i></label>
			      		</div>
			      		@if ($errors->has('password_confirmation'))
                            <span class="help-block">
                                <strong>{{ $errors->first('password_confirmation') }}</strong>
                            </span>
                        @endif
			      	</div>
				</div>

				{!! Form::button('<i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;' . Lang::get('forms.create_user_button_text'), array('class' => 'btn btn-primary btn-flat btn-lg margin-bottom-1 col-md-offset-3','type' => 'submit')) !!}

			{!! Form::close() !!}

		</div>
	</div>
</div>


@endsection



@section('footerScript')




@endsection