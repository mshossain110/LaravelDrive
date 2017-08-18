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


<showmedia></showmedia>


@endsection



@section('footerScript')

   

@endsection